import 'reflect-metadata';

export { AppDataSource } from './data-source';

// Export all entities
export { User, UserRole, TransportType } from './entities/user.entity';
export { Ticket, TicketStatus } from './entities/ticket.entity';
export { Route } from './entities/route.entity';
export { Trip, TripStatus } from './entities/trip.entity';
export { Booking } from './entities/booking.entity';
export { Payment, PaymentStatus } from './entities/payment.entity';
export { Vehicle, VehicleStatus } from './entities/vehicle.entity';
export { Operator } from './entities/operator.entity';
export { AnalyticsEvent } from './entities/analytics.entity';
export { MLTrainingData } from './entities/ml-data.entity';
