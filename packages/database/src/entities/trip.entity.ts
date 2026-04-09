import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { TransportType } from './user.entity';
import { Route } from './route.entity';
import { Ticket } from './ticket.entity';
import { Vehicle } from './vehicle.entity';

export enum TripStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DELAYED = 'DELAYED',
}

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'route_id' })
  routeId: string;

  @ManyToOne(() => Route, (route) => route.trips)
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @Index()
  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.trips)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column({ name: 'operator_id' })
  operatorId: string;

  @Column('timestamptz')
  departureTime: Date;

  @Column('timestamptz')
  arrivalTime: Date;

  @Column({
    type: 'enum',
    enum: TransportType,
  })
  transportType: TransportType;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.SCHEDULED,
  })
  status: TripStatus;

  @Column('int')
  totalSeats: number;

  @Column('int')
  availableSeats: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dynamicPrice: number;

  @Column({ default: false })
  allowReservation: boolean;

  @Column({ nullable: true })
  delayMinutes: number;

  @Column({ type: 'jsonb', default: {} })
  amenities: Record<string, any>;

  @OneToMany(() => Ticket, (ticket) => ticket.trip)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getCurrentPrice(): number {
    return this.dynamicPrice || this.basePrice;
  }

  getOccupancyRate(): number {
    return ((this.totalSeats - this.availableSeats) / this.totalSeats) * 100;
  }
}
