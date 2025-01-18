import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { Reservation } from 'src/entities/reservation.entity';

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'inventory_management',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities: [Product, Order, Reservation], // Explicitly list your entities
    synchronize: true,
  }),
  // TypeOrmModule.forFeature([Product]),
];
