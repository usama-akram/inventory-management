const express = require('express');
const router = express.Router();


const inventoryRoute = require('../controllers/inventory.controller');


/**
 * This approach will get change in real world
 * as we will have multiple routers. So we will be 
 * using base route before other routes.
 * Example: for user controller we will have "/user" as base.
*/

// router.requestFunction('path', middleware, controller)
router.get('/test', inventoryRoute.sayHi);

router.get('/products', inventoryRoute.getListOfProducts);


router.post('/create-product', inventoryRoute.createProduct);


router.get('/stock-levels/:productId', inventoryRoute.getProductStocks);


router.post('/update-stocks/:productId', inventoryRoute.updateProductStocks);


router.post('/order-placed/:productId', inventoryRoute.orderPlaced);


router.post('/reserve-stock/:productId', inventoryRoute.reserveStocks);


module.exports = router;