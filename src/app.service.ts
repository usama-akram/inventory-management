import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStockDto } from './dtos/updateStocks.dto';
import { ERROR_MESSAGES_CONSTANTS } from './globals/error-messages.constants';
import { CreateProductDto } from './dtos/createProduct.dto';
import { OrderPlacedDto } from './dtos/orderPlaced.dto';
import { Order } from './entities/order.entity';
import { Reservation } from './entities/reservation.entity';
import { ReserveStockDto } from './dtos/reserveStock.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getProductList(): Promise<Product[]> {
    return await this.productRepository.find({});
  }

  async createProduct(product: CreateProductDto) {
    try {
      return this.productRepository.insert({name: product.name, category: product.category, price: product.price, stock: product.stock})
    } catch (e) {
      throw new HttpException(e.message || ERROR_MESSAGES_CONSTANTS.somethingWentWrong, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async productStocks(productId: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { id: Number(productId) } });
  }

  async updateStocks(updateStockDto: UpdateStockDto): Promise<string> {
    try {
      const result = await this.productRepository.update(
        { id: Number(updateStockDto.productId) }, // Criteria for selecting the record
        { stock: updateStockDto.quantity }, // Fields to update
      );

      if (result.affected === 0) {
        throw new HttpException(`Product with id ${updateStockDto.productId} not found or no changes made`, HttpStatus.NOT_FOUND);
      }

      return `Product's stocks updated successfully`
    } catch (e) {
      throw new HttpException(e.message || ERROR_MESSAGES_CONSTANTS.somethingWentWrong, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async orderPlaced(order: OrderPlacedDto) {
    try {
      const product = await this.productRepository.findOne({where: {id: Number(order?.productId)}})
      if (!product) {
        throw new HttpException(ERROR_MESSAGES_CONSTANTS.productNotFound, HttpStatus.NOT_FOUND);
      }

      if (product?.stock < Number(order?.quantity)) {
        throw new HttpException(ERROR_MESSAGES_CONSTANTS.productQuantityIsLessThanOrderQuantity, HttpStatus.NOT_ACCEPTABLE);
      }

      const result = await this.productRepository.update(
        {id: product.id},
        {stock: (product.stock - Number(order.quantity))}
      )

      if (result.affected === 0) {
        throw new HttpException(`Product with id ${order.productId} not found or no changes made`, HttpStatus.NOT_FOUND);
      }

      await this.orderRepository.insert({productId: Number(product.id), stock: order.quantity})

      return `Order placed successfully`
    } catch (e) {
      throw new HttpException(e.message || ERROR_MESSAGES_CONSTANTS.somethingWentWrong, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async reserveProductStock(reserveStock: ReserveStockDto) {
    try {
    const product = await this.productRepository.findOne({where: {id: Number(reserveStock?.productId)}})
    if (!product) {
      throw new HttpException(ERROR_MESSAGES_CONSTANTS.productNotFound, HttpStatus.NOT_FOUND);
    }

    if (product?.stock < Number(reserveStock?.quantity)) {
      throw new HttpException(ERROR_MESSAGES_CONSTANTS.productQuantityIsLessThanOrderQuantity, HttpStatus.NOT_ACCEPTABLE);
    }

    const result = await this.productRepository.update(
      {id: product.id},
      {stock: (product.stock - Number(reserveStock.quantity))}
    )

    if (result.affected === 0) {
      throw new HttpException(`Product with id ${reserveStock.productId} not found or no changes made`, HttpStatus.NOT_FOUND);
    }

    await this.reservationRepository.insert({productId: Number(product.id), stock: reserveStock.quantity})

    return `Order placed successfully`
    } catch (e) {
      throw new HttpException(e.message || ERROR_MESSAGES_CONSTANTS.somethingWentWrong, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
