import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Booking } from './booking.entity';
import { AnalyticsEvent } from './analytics.entity';

export enum UserRole {
  PASSENGER = 'PASSENGER',
  OPERATOR = 'OPERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum TransportType {
  BUS = 'BUS',
  TRAIN = 'TRAIN',
  PLANE = 'PLANE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true, nullable: true })
  @IsPhoneNumber()
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PASSENGER,
  })
  role: UserRole;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  phoneVerified: boolean;

  @Column({ type: 'jsonb', default: {} })
  preferences: Record<string, any>;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  loyaltyPoints: number;

  @Column({ default: 'BRONZE' })
  loyaltyTier: string;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => AnalyticsEvent, (event) => event.user)
  analyticsEvents: AnalyticsEvent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(plainPassword, this.password);
  }
}
