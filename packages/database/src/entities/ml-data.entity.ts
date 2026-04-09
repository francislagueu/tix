import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { TransportType } from './user.entity';

export enum MLDataType {
  USER_PREFERENCE = 'USER_PREFERENCE',
  BOOKING_PATTERN = 'BOOKING_PATTERN',
  SEARCH_BEHAVIOR = 'SEARCH_BEHAVIOR',
  PRICE_SENSITIVITY = 'PRICE_SENSITIVITY',
  ROUTE_POPULARITY = 'ROUTE_POPULARITY',
  TIME_PREFERENCE = 'TIME_PREFERENCE',
}

@Entity('ml_training_data')
export class MLTrainingData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: MLDataType,
  })
  dataType: MLDataType;

  @Column()
  featureName: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  featureValue: number;

  @Column({ nullable: true })
  stringValue: string;

  @Column({
    type: 'enum',
    enum: TransportType,
    nullable: true,
  })
  transportType: TransportType | null;

  @Column({ nullable: true })
  routeId: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  destination: string;

  @Column({ type: 'jsonb', default: {} })
  context: Record<string, any>;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  timestamp: Date;

  @Column({ default: 1 })
  weight: number;

  @CreateDateColumn()
  createdAt: Date;

  static createTrainingData(
    userId: string,
    dataType: MLDataType,
    featureName: string,
    options: {
      featureValue?: number;
      stringValue?: string;
      transportType?: TransportType;
      routeId?: string;
      origin?: string;
      destination?: string;
      context?: Record<string, any>;
      price?: number;
      timestamp?: Date;
      weight?: number;
    } = {},
  ): MLTrainingData {
    const data = new MLTrainingData();
    data.userId = userId;
    data.dataType = dataType;
    data.featureName = featureName;
    data.featureValue = options.featureValue || 0;
    data.stringValue = options.stringValue || '';
    data.transportType = options.transportType || null;
    data.routeId = options.routeId || '';
    data.origin = options.origin || '';
    data.destination = options.destination || '';
    data.context = options.context || {};
    data.price = options.price || 0;
    data.timestamp = options.timestamp || new Date();
    data.weight = options.weight || 1;
    return data;
  }
}
