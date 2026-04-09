import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
} from 'typeorm';
import { TransportType } from './user.entity';
import { Trip } from './trip.entity';
import { Booking } from './booking.entity';

export enum TicketStatus {
  RESERVED = 'RESERVED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  USED = 'USED',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ticketNumber: string;

  @Index()
  @Column({ name: 'trip_id' })
  tripId: string;

  @ManyToOne(() => Trip, (trip) => trip.tickets)
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;

  @Index()
  @Column({ name: 'booking_id', nullable: true })
  bookingId: string;

  @OneToOne(() => Booking, (booking) => booking.ticket)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column()
  seatNumber: string;

  @Column({
    type: 'enum',
    enum: TransportType,
  })
  transportType: TransportType;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.RESERVED,
  })
  status: TicketStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  platformFee: number;

  @Column({ nullable: true })
  qrCode: string;

  @Column({ type: 'jsonb', default: {} })
  passengerDetails: Record<string, any>;

  @Column({ nullable: true })
  reservedUntil: Date;

  @Column({ nullable: true })
  paidAt: Date;

  @Column({ nullable: true })
  cancelledAt: Date;

  @Column({ nullable: true })
  cancellationReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static generateTicketNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TIX-${timestamp}-${random}`;
  }
}
