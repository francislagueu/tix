import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';
import { Payment } from './payment.entity';

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

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  bookingReference: string;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @Column({ name: 'trip_id' })
  tripId: string;

  @Column('int')
  numberOfSeats: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  platformFee: number;

  @Column({ nullable: true })
  paymentDeadline: Date;

  @Column({ nullable: true })
  reservedUntil: Date;

  @Column({ type: 'jsonb', default: [] })
  passengers: Record<string, any>[];

  @Column({ nullable: true })
  specialRequests: string;

  @OneToOne(() => Ticket, (ticket) => ticket.booking)
  ticket: Ticket;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static generateBookingReference(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BK-${timestamp}-${random}`;
  }

  isPaymentOverdue(): boolean {
    if (!this.paymentDeadline) return false;
    return new Date() > this.paymentDeadline;
  }

  canBeReserved(): boolean {
    if (!this.reservedUntil) return false;
    return new Date() < this.reservedUntil;
  }
}
