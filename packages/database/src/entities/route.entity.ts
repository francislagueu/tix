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

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index()
  @Column()
  origin: string;

  @Index()
  @Column()
  destination: string;

  @Column({
    type: 'enum',
    enum: TransportType,
  })
  transportType: TransportType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  distance: number;

  @Column('int')
  duration: number; // in minutes

  @Column({ type: 'jsonb', default: [] })
  stops: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getRouteCode(): string {
    const originCode = this.origin.substring(0, 3).toUpperCase();
    const destCode = this.destination.substring(0, 3).toUpperCase();
    return `${originCode}-${destCode}`;
  }
}
