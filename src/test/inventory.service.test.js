const { getListOfProducts, createProduct, getProductStocks, updateProductStocks, orderPlaced, reserveStocks } = require('../controllers/inventory.controller'); // Adjust the import path as needed
const sequelizeMock = require('sequelize-mock');
const httpStatusCodes = require('../constants/httpStatusCodes'); // or your own enum for status codes
const { ApiError } = require('../utils/error'); // Assuming you have your own error class

// Mock sequelize model using sequelize-mock
const dbMock = new sequelizeMock();
const ProductMock = dbMock.define('Product', {
  name: 'Test Product',
  category: 'Category 1',
  price: 100,
  stocks: 50,
});

// Mock the inventoryService in place within jest.mock
jest.mock('../services/inventory.service', () => ({
  getListOfProducts: jest.fn(),
  createProduct: jest.fn(),
  getProduct: jest.fn(),
  updateProductStocks: jest.fn(),
  orderPlaced: jest.fn(),
  reserveStocks: jest.fn(),
}));

const res = {
  respond: jest.fn(),
  send: jest.fn(),
};

describe('Inventory Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clears mocks before each test
  });

  describe('getListOfProducts', () => {
    it('should return list of products successfully', async () => {
      const mockProductList = [ProductMock.build(), ProductMock.build()];
      require('../services/inventory.service').getListOfProducts.mockResolvedValue(mockProductList);

      const req = {};
      await getListOfProducts(req, res);

      expect(require('../services/inventory.service').getListOfProducts).toHaveBeenCalledTimes(1);
      expect(res.respond).toHaveBeenCalledWith({
        statusCode: 200,
        message: 'success',
        data: mockProductList,
      });
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('Database error');
      require('../services/inventory.service').getListOfProducts.mockRejectedValue(error);

      const req = {};
      await expect(getListOfProducts(req, res)).rejects.toThrowError(error);
    });
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const newProduct = { name: 'New Product', category: 'Category 2', price: 200, stocks: 30 };
      const mockProduct = ProductMock.build(newProduct);
      require('../services/inventory.service').createProduct.mockResolvedValue(mockProduct);

      const req = { body: newProduct };
      await createProduct(req, res);

      expect(require('../services/inventory.service').createProduct).toHaveBeenCalledWith(newProduct);
      expect(res.send).toHaveBeenCalledWith({
        message: 'success',
        data: mockProduct,
      });
    });

    it('should handle errors gracefully when creating product', async () => {
      const error = new Error('Invalid product data');
      require('../services/inventory.service').createProduct.mockRejectedValue(error);

      const req = { body: { name: '', category: 'Category 1', price: 50, stocks: 10 } };
      await expect(createProduct(req, res)).rejects.toThrowError(error);
    });
  });

  describe('getProductStocks', () => {
    it('should return product stocks successfully', async () => {
      const mockProduct = ProductMock.build({ id: 1, stocks: 50 });
      require('../services/inventory.service').getProduct.mockResolvedValue(mockProduct);

      const req = { params: { productId: 1 } };
      await getProductStocks(req, res);

      expect(require('../services/inventory.service').getProduct).toHaveBeenCalledWith({ productId: 1 });
      expect(res.send).toHaveBeenCalledWith({
        message: 'success',
        data: { product: mockProduct.dataValues },
      });
    });

    it('should handle errors gracefully when fetching product stocks', async () => {
      const error = new Error('Product not found');
      require('../services/inventory.service').getProduct.mockRejectedValue(error);

      const req = { params: { productId: 999 } };
      await expect(getProductStocks(req, res)).rejects.toThrowError(error);
    });
  });

  describe('updateProductStocks', () => {
    it('should update product stocks successfully', async () => {
      const updatedProduct = { id: 1, name: 'Test Product', stocks: 100 };
      require('../services/inventory.service').updateProductStocks.mockResolvedValue(updatedProduct);

      const req = { params: { productId: 1 }, body: { stocks: 100 } };
      await updateProductStocks(req, res);

      expect(require('../services/inventory.service').updateProductStocks).toHaveBeenCalledWith({
        productId: 1,
        stocks: 100,
      });
      expect(res.send).toHaveBeenCalledWith({
        message: 'success',
        data: { product: updatedProduct },
      });
    });

    it('should handle errors gracefully when updating product stocks', async () => {
      const error = new Error('Product not found');
      require('../services/inventory.service').updateProductStocks.mockRejectedValue(error);

      const req = { params: { productId: 1 }, body: { stocks: 100 } };
      await expect(updateProductStocks(req, res)).rejects.toThrowError(error);
    });
  });

  describe('orderPlaced', () => {
    it('should process order placement successfully', async () => {
      const mockProduct = ProductMock.build({ id: 1, stocks: 50 });
      require('../services/inventory.service').orderPlaced.mockResolvedValue(mockProduct);

      const req = { params: { productId: 1 }, body: { quantity: 2 } };
      await orderPlaced(req, res);

      expect(require('../services/inventory.service').orderPlaced).toHaveBeenCalledWith({ productId: 1, quantity: 2 });
      expect(res.send).toHaveBeenCalledWith({
        message: 'success',
        data: { product: mockProduct.dataValues },
      });
    });

    it('should handle errors gracefully when placing order', async () => {
      const error = new Error('Order placement failed');
      require('../services/inventory.service').orderPlaced.mockRejectedValue(error);

      const req = { params: { productId: 1 }, body: { quantity: 2 } };
      await expect(orderPlaced(req, res)).rejects.toThrowError(error);
    });
  });

  describe('reserveStocks', () => {
    it('should reserve stocks successfully', async () => {
      const mockProduct = ProductMock.build({ id: 1, stocks: 50 });
      require('../services/inventory.service').reserveStocks.mockResolvedValue(mockProduct);

      const req = { params: { productId: 1 }, body: { quantity: 5 } };
      await reserveStocks(req, res);

      expect(require('../services/inventory.service').reserveStocks).toHaveBeenCalledWith({ productId: 1, quantity: 5 });
      expect(res.send).toHaveBeenCalledWith({
        message: 'success',
        data: { product: mockProduct.dataValues },
      });
    });

    it('should handle errors gracefully when reserving stocks', async () => {
      const error = new Error('Insufficient stock');
      require('../services/inventory.service').reserveStocks.mockRejectedValue(error);

      const req = { params: { productId: 1 }, body: { quantity: 100 } };
      await expect(reserveStocks(req, res)).rejects.toThrowError(error);
    });
  });
});
