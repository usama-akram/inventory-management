import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './entities/product.entity';
import { UpdateStockDto } from './dtos/updateStocks.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { OrderPlacedDto } from './dtos/orderPlaced.dto';
import { ReserveStockDto } from './dtos/reserveStock.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  listProducts() {
    return this.appService.getProductList();
  }

  @Post('create-product')
  createProduct(@Body() body: CreateProductDto) {
    return this.appService.createProduct(body)
  }

  @Get('stock-levels/:productId')
  getProductStocks(@Param('productId') productId: string): Promise<Product> {
    return this.appService.productStocks(productId)
  }

  @Post('update-stock')
  updateProductStocks(@Body() body: UpdateStockDto): Promise<string> {
    return this.appService.updateStocks(body)
  }

  @Post('order-placed')
  orderPlaced(@Body() body: OrderPlacedDto) {
    return this.appService.orderPlaced(body)
  }

  @Post('reserve-stock')
  reserveOrder(@Body() body: ReserveStockDto) {
    return this.appService.reserveProductStock(body)
  }
}
