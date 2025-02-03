const httpStatusCodes = require("../constants/httpStatusCodes");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");

const { inventoryService } = require("../services");

const sayHi = catchAsync(async (req, res) => {
  res.status(httpStatusCodes.OK).send({
    message: "Hi people",
  });
});

const getListOfProducts = catchAsync(async (req, res) => {
  try {
    const list = await inventoryService.getListOfProducts();
    res.respond({
      statusCode: 200,
      message: "success",
      data: list,
    });
  } catch (error) {
    throw new ApiError(
      error?.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "Something went wrong"
    );
  }
});

const createProduct = catchAsync(async (req, res) => {
  try {
    const { name, category, price, stocks } = req.body;
    const product = await inventoryService.createProduct({
      name,
      category,
      price,
      stocks,
    });
    res.send({
      message: "success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error?.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "Something went wrong"
    );
  }
});

const getProductStocks = catchAsync(async (req, res) => {
  try {
    const { productId } = req?.params;
    const product = await inventoryService.getProduct({
      productId,
    });
    res.send({
      message: "success",
      data: { product: product?.dataValues },
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error?.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "Something went wrong"
    );
  }
});

const updateProductStocks = catchAsync(async (req, res) => {
  try {
    const { productId } = req?.params;
    const { stocks } = req?.body;
    const product = await inventoryService.updateProductStocks({
      productId,
      stocks,
    });
    res.send({
      message: "success",
      data: { product: product },
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error?.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "Something went wrong"
    );
  }
});

const orderPlaced = catchAsync(async (req, res) => {
  try {
    const { productId } = req?.params;
    const { quantity } = req?.body;
    const product = await inventoryService.orderPlaced({
      productId,
      quantity,
    });
    res.send({
      message: "success",
      data: { product: product?.dataValues },
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error?.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "Something went wrong"
    );
  }
});

const reserveStocks = catchAsync(async (req, res) => {
  try {
    const { productId } = req?.params;
    const { quantity } = req?.body;
    const product = await inventoryService.reserveStocks({
      productId,
      quantity,
    });
    res.send({
      message: "success",
      data: { product: product?.dataValues },
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error?.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
      error?.message || "Something went wrong"
    );
  }
});

module.exports = {
  sayHi,
  getListOfProducts,
  createProduct,
  getProductStocks,
  updateProductStocks,
  orderPlaced,
  reserveStocks,
};
