// inventory.service.test.js

const { ApiError } = require('../utils/APIError'); // Import the custom error handler
const httpStatusCodes = require('../constants/httpStatusCodes'); // For HTTP codes
const inventoryService = require('../services/inventory.service'); // Service to be tested
const sequelizeMock = require('sequelize-mock'); // Sequelize mock
// const { Product, Order, Reservation } = require('../models'); // Import the models

// Create a mock database
const dbMock = new sequelizeMock();

// Mock models
const MockProduct = dbMock.define('Product', {
  id: 1,
  name: 'Test Product',
  category: 'Electronics',
  price: 100,
  stocks: 50,
});

const MockOrder = dbMock.define('Order', {
  quantity: 1,
  productId: 1,
});

const MockReservation = dbMock.define('Reservation', {
  quantity: 1,
  productId: 1,
});

// Inject the mocked models into the service
jest.mock('../models', () => ({
  Product: MockProduct,
  Order: MockOrder,
  Reservation: MockReservation,
}));

describe('Inventory Service Tests', () => {
  // Test getListOfProducts
  describe('getListOfProducts', () => {
    it('should return a list of products', async () => {
      const products = await inventoryService.getListOfProducts();
      jest.spyOn(inventoryService, 'getListOfProducts').mockResolvedValue(MockProduct);
      expect(products).toHaveLength(1);
      expect(products[0].name).toBe('Test Product');
    });
  });

  // Test createProduct
  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProductData = {
        name: 'New Product',
        category: 'Home Appliance',
        price: 200,
        stocks: 30,
      };

      // Simulating creation success
      MockProduct.create = jest.fn().mockResolvedValue(newProductData);

      const product = await inventoryService.createProduct(newProductData);
      expect(product.name).toBe('New Product');
      expect(product.category).toBe('Home Appliance');
      expect(product.price).toBe(200);
      expect(product.stocks).toBe(30);
    });

    it('should throw an error if creation fails', async () => {
      MockProduct.create = jest.fn().mockRejectedValue(new Error('Error creating product'));
      
      try {
        await inventoryService.createProduct({});
      } catch (e) {
        expect(e.message).toBe('Error creating product');
      }
    });
  });

  // Test getProduct
  describe('getProduct', () => {
    it('should return a product by ID', async () => {
      const product = await inventoryService.getProduct({ productId: 1 });
      expect(product.name).toBe('Test Product');
      expect(product.id).toBe(1);
    });

    it('should throw an error if product is not found', async () => {
      MockProduct.findByPk = jest.fn().mockResolvedValue(null);

      try {
        await inventoryService.getProduct({ productId: 999 });
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect(e.statusCode).toBe(httpStatusCodes.NOT_FOUND);
        expect(e.message).toBe('Product not found');
      }
    });
  });

  // Test updateProductStocks
  describe('updateProductStocks', () => {
    it('should update product stocks', async () => {
      const updatedProductData = { stocks: 100 };
      MockProduct.update = jest.fn().mockResolvedValue([1]); // Mock successful update

      const result = await inventoryService.updateProductStocks({
        productId: 1,
        stocks: 100,
      });

      expect(result[0]).toBe(1); // Sequelize update returns a [affectedRows] array
    });

    it('should throw an error if product is not found', async () => {
      MockProduct.findByPk = jest.fn().mockResolvedValue(null);

      try {
        await inventoryService.updateProductStocks({
          productId: 999,
          stocks: 50,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect(e.statusCode).toBe(httpStatusCodes.NOT_FOUND);
        expect(e.message).toBe('Product not found');
      }
    });
  });

  // Test orderPlaced
  describe('orderPlaced', () => {
    it('should reduce stock and create an order', async () => {
      MockProduct.findByPk = jest.fn().mockResolvedValue({ stocks: 50 });
      MockProduct.update = jest.fn().mockResolvedValue([1]); // Mock stock reduction
      MockOrder.create = jest.fn().mockResolvedValue({
        quantity: 1,
        productId: 1,
      });

      const order = await inventoryService.orderPlaced({ productId: 1, quantity: 1 });
      expect(order.quantity).toBe(1);
    });

    it('should throw an error if not enough stock', async () => {
      MockProduct.findByPk = jest.fn().mockResolvedValue({ stocks: 0 });

      try {
        await inventoryService.orderPlaced({ productId: 1, quantity: 1 });
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect(e.statusCode).toBe(httpStatusCodes.CONFLICT);
        expect(e.message).toBe('Not enough quantity');
      }
    });
  });

  // Test reserveStocks
  describe('reserveStocks', () => {
    it('should reduce stock and create a reservation', async () => {
      MockProduct.findByPk = jest.fn().mockResolvedValue({ stocks: 50 });
      MockProduct.update = jest.fn().mockResolvedValue([1]); // Mock stock reduction
      MockReservation.create = jest.fn().mockResolvedValue({
        quantity: 1,
        productId: 1,
      });

      const reservation = await inventoryService.reserveStocks({ productId: 1, quantity: 1 });
      expect(reservation.quantity).toBe(1);
    });

    it('should throw an error if not enough stock to reserve', async () => {
      MockProduct.findByPk = jest.fn().mockResolvedValue({ stocks: 0 });

      try {
        await inventoryService.reserveStocks({ productId: 1, quantity: 1 });
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect(e.statusCode).toBe(httpStatusCodes.CONFLICT);
        expect(e.message).toBe('Not enough quantity');
      }
    });
  });
});

