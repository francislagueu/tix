import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Ticket } from './entities/ticket.entity';
import { Route } from './entities/route.entity';
import { Trip } from './entities/trip.entity';
import { Booking } from './entities/booking.entity';
import { Payment } from './entities/payment.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Operator } from './entities/operator.entity';
import { AnalyticsEvent } from './entities/analytics.entity';
import { MLTrainingData } from './entities/ml-data.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'tix_platform',
  entities: [
    User,
    Ticket,
    Route,
    Trip,
    Booking,
    Payment,
    Vehicle,
    Operator,
    AnalyticsEvent,
    MLTrainingData,
  ],
  migrations: ['migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
  },
});
