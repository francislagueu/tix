import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum EventType {
  PAGE_VIEW = 'PAGE_VIEW',
  SEARCH = 'SEARCH',
  BOOKING_STARTED = 'BOOKING_STARTED',
  BOOKING_COMPLETED = 'BOOKING_COMPLETED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  PAYMENT_INITIATED = 'PAYMENT_INITIATED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  TICKET_VIEWED = 'TICKET_VIEWED',
  TICKET_DOWNLOADED = 'TICKET_DOWNLOADED',
  ROUTE_FAVORITED = 'ROUTE_FAVORITED',
  NOTIFICATION_OPENED = 'NOTIFICATION_OPENED',
  APP_OPENED = 'APP_OPENED',
  FEATURE_USED = 'FEATURE_USED',
  ERROR_OCCURRED = 'ERROR_OCCURRED',
}

@Entity('analytics_events')
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.analyticsEvents)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  sessionId: string;

  @Index()
  @Column({
    type: 'enum',
    enum: EventType,
  })
  eventType: EventType;

  @Column()
  eventName: string;

  @Column({ type: 'jsonb', default: {} })
  properties: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  deviceType: string;

  @Column({ nullable: true })
  osVersion: string;

  @Column({ nullable: true })
  appVersion: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  timestamp: Date;

  static createEvent(
    eventType: EventType,
    eventName: string,
    userId: string,
    properties: Record<string, any> = {},
    metadata: Record<string, any> = {},
  ): AnalyticsEvent {
    const event = new AnalyticsEvent();
    event.eventType = eventType;
    event.eventName = eventName;
    event.userId = userId;
    event.properties = properties;
    event.metadata = metadata;
    event.timestamp = new Date();
    return event;
  }
}
