/**
 * Tix Reservation & Payment Rules:
 * 1. No reservations allowed <2h before departure
 * 2. Standard: Pay 24h before departure
 * 3. Same-day booking: Pay 4h before departure
 * 4. Auto-cancel if payment not received by deadline
 */
export function calculateBookingDeadlines(
  departureTime: Date,
  isSameDayBooking: boolean,
) {
  const now = new Date();
  const hoursUntilDeparture =
    (departureTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilDeparture < 2) {
    throw new Error(
      'RESERVATION_BLOCKED: Bookings are not allowed less than 2 hours before departure.',
    );
  }

  let paymentDeadline: Date;
  if (isSameDayBooking) {
    // Same day: must pay 4 hours before departure
    paymentDeadline = new Date(departureTime.getTime() - 4 * 60 * 60 * 1000);
  } else {
    // Standard: must pay 24 hours before departure
    paymentDeadline = new Date(departureTime.getTime() - 24 * 60 * 60 * 1000);
  }

  // If calculated deadline is in the past, booking cannot proceed
  if (paymentDeadline < now) {
    throw new Error(
      'PAYMENT_DEADLINE_PASSED: Payment deadline has passed for this trip.',
    );
  }

  return { paymentDeadline, reservationDeadline: departureTime };
}

export function formatCurrency(amount: number, currency = 'XAF'): string {
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency }).format(
    amount,
  );
}

export function generateQRData(
  ticketId: string,
  userId: string,
  tripId: string,
): string {
  return JSON.stringify({
    tid: ticketId,
    uid: userId,
    pid: tripId,
    ts: Date.now(),
  });
}
