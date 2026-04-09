import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { TransportType } from './user.entity';
import { Trip } from './trip.entity';

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  INACTIVE = 'INACTIVE',
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  registrationNumber: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column('int')
  year: number;

  @Column({
    type: 'enum',
    enum: TransportType,
  })
  transportType: TransportType;

  @Column('int')
  capacity: number;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.ACTIVE,
  })
  status: VehicleStatus;

  @Column({ type: 'jsonb', default: {} })
  amenities: Record<string, any>;

  @Column({ nullable: true })
  currentLocation: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ nullable: true })
  lastGpsUpdate: Date;

  @Column({ name: 'operator_id' })
  operatorId: string;

  @OneToMany(() => Trip, (trip) => trip.vehicle)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  updateLocation(lat: number, lng: number): void {
    this.latitude = lat;
    this.longitude = lng;
    this.lastGpsUpdate = new Date();
  }
}
