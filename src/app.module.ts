import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Product, Order, Reservation]), // Register the Product entity
  ],
  controllers: [AppController], // Ensure the AppController is listed here
  providers: [AppService], // Include AppService if used
})
export class AppModule {}
