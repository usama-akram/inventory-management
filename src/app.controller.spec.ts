import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderPlacedDto } from './dtos/orderPlaced.dto';
import { ReserveStockDto } from './dtos/reserveStock.dto';
import { UpdateStockDto } from './dtos/updateStocks.dto';
import { Product } from './entities/product.entity';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            productStocks: jest.fn(),
            updateStocks: jest.fn(),
            orderPlaced: jest.fn(),
            reserveProductStock: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getProductStocks', () => {
    it('should return the product stocks', async () => {
      const mockProduct: Product = {
        id: 1, name: 'Sample Product', stock: 100,
        category: '',
        price: 0,
        createdAt: new Date()
      };
      jest.spyOn(appService, 'productStocks').mockResolvedValue(mockProduct);

      const result = await appController.getProductStocks('1');
      expect(result).toEqual(mockProduct);
      expect(appService.productStocks).toHaveBeenCalledWith('1');
    });
  });

  describe('updateProductStocks', () => {
    it('should update product stocks and return a success message', async () => {
      const updateStockDto: UpdateStockDto = {
        productId: '1',
        quantity: 10,
      };

      jest.spyOn(appService, 'updateStocks').mockResolvedValue('Stock updated successfully');

      const result = await appController.updateProductStocks(updateStockDto);
      expect(result).toBe('Stock updated successfully');
      expect(appService.updateStocks).toHaveBeenCalledWith(updateStockDto);
    });
  });

  describe('orderPlaced', () => {
    it('should process the order placed and return a confirmation', async () => {
      const orderPlacedDto: OrderPlacedDto = {
        productId: '1',
        quantity: 2,
      };

      jest.spyOn(appService, 'orderPlaced').mockResolvedValue('Order processed successfully');

      const result = await appController.orderPlaced(orderPlacedDto);
      expect(result).toBe('Order processed successfully');
      expect(appService.orderPlaced).toHaveBeenCalledWith(orderPlacedDto);
    });
  });

  describe('reserveOrder', () => {
    it('should reserve product stock for an order', async () => {
      const reserveStockDto: ReserveStockDto = {
        productId: '1',
        quantity: 5,
      };

      jest.spyOn(appService, 'reserveProductStock').mockResolvedValue('Stock reserved successfully');

      const result = await appController.reserveOrder(reserveStockDto);
      expect(result).toBe('Stock reserved successfully');
      expect(appService.reserveProductStock).toHaveBeenCalledWith(reserveStockDto);
    });
  });
});
