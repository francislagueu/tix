export enum TransportType {
  BUS = 'BUS',
  TRAIN = 'TRAIN',
  PLANE = 'PLANE',
}
export enum UserRole {
  PASSENGER = 'PASSENGER',
  OPERATOR = 'OPERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
export enum TicketStatus {
  RESERVED = 'RESERVED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  USED = 'USED',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
}
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED',
}
export enum PaymentMethod {
  MTN_MOBILE_MONEY = 'MTN_MOBILE_MONEY',
  ORANGE_MONEY = 'ORANGE_MONEY',
  WAVE = 'WAVE',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  RESERVE_PAY_LATER = 'RESERVE_PAY_LATER',
}
export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}
export enum EventType {
  PAGE_VIEW = 'PAGE_VIEW',
  SEARCH = 'SEARCH',
  BOOKING_STARTED = 'BOOKING_STARTED',
  BOOKING_COMPLETED = 'BOOKING_COMPLETED',
  PAYMENT_INITIATED = 'PAYMENT_INITIATED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  TICKET_VIEWED = 'TICKET_VIEWED',
  FEATURE_USED = 'FEATURE_USED',
}

export interface CreateBookingDTO {
  tripId: string;
  seatNumbers: string[];
  passengers: {
    firstName: string;
    lastName: string;
    idNumber?: string;
    phone?: string;
  }[];
  paymentMethod: PaymentMethod;
  specialRequests?: string;
}

export interface BookingResponse {
  bookingId: string;
  reference: string;
  status: BookingStatus;
  paymentDeadline: Date;
  tickets: {
    id: string;
    seatNumber: string;
    qrCode: string;
    status: TicketStatus;
  }[];
  totalPrice: number;
  platformFee: number;
}

export interface AIRecommendation {
  routeId: string;
  transportType: TransportType;
  score: number;
  reason: string;
}
