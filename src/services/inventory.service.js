const httpStatusCodes = require("../constants/httpStatusCodes");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const ApiError = require("../utils/APIError");
const Reservation = require("../models/reservation.model");
/**
 * Get List of products
 * @param {Object} params
 * @returns {Promise<Product>}
 */
const getListOfProducts = async (params = {}) => {
  return await Product.findAll();
};

const createProduct = async ({ name, category, price, stocks }) => {
  return await Product.create({
    name: name,
    category: category,
    price: price,
    stocks: stocks,
  });
};

const getProduct = async ({ productId }) => {
  return await Product.findByPk(productId);
};

const updateProductStocks = async ({ productId, stocks }) => {
  const product = Product.findByPk(productId);
  if (!product) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "Product not found");
  }
  return await Product.update({ stocks: stocks }, { where: { id: productId } });
};

const orderPlaced = async ({ productId, quantity }) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "Product not found");
  }

  if (product?.stocks < quantity) {
    throw new ApiError(httpStatusCodes.CONFLICT, "Not enough quantity");
  }

  const updatedProduct = await Product.update(
    { stocks: product?.stocks - quantity },
    {
      where: {
        id: productId,
      },
    }
  );

  return await Order.create({
    quantity: quantity,
    productId: productId,
  });
};

const reserveStocks = async ({ productId, quantity }) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new ApiError(httpStatusCodes.NOT_FOUND, "Product not found");
  }

  if (product?.stocks < quantity) {
    throw new ApiError(httpStatusCodes.CONFLICT, "Not enough quantity");
  }

  const updatedProduct = await Product.update(
    { stocks: product?.stocks - quantity },
    {
      where: {
        id: productId,
      },
    }
  );

  return await Reservation.create({
    quantity: quantity,
    productId: productId,
  });
};

module.exports = {
  getListOfProducts,
  createProduct,
  getProduct,
  updateProductStocks,
  orderPlaced,
  reserveStocks,
};
