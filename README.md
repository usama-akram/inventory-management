# Inventory Management API

This project is a simple **Inventory Management API** built using **Express.js** and **Sequelize** to interact with a **MySQL** database. The API allows users to manage products, update stock levels, place orders, and reserve stock, among other functionalities.

### Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [GET /products](#get-products)
  - [POST /create-product](#create-product)
  - [GET /stock-levels/:productId](#get-stock-levels)
  - [POST /update-stocks/:productId](#update-stocks)
  - [POST /order-placed/:productId](#order-placed)
  - [POST /reserve-stock/:productId](#reserve-stock)
- [Project Setup](#project-setup)
  - [Install Dependencies](#install-dependencies)
  - [Set Up Database](#set-up-database)
  - [Run the Application](#run-the-application)
- [Testing](#testing)
- [License](#license)

---

## Project Overview

This API is designed to manage products in an inventory system, providing endpoints for:
- Fetching a list of products.
- Creating new products.
- Updating stock levels for products.
- Handling order placements and stock reservations.

The project follows a **MVC (Model-View-Controller)** pattern with the following structure:
- **Models**: Represents the database schema and relationships (Sequelize).
- **Controllers**: Handles incoming requests and business logic.
- **Services**: Contains the business logic to interact with the models.
- **Routes**: Defines the API endpoints and maps them to controller functions.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **Sequelize**: ORM for interacting with a MySQL database.
- **MySQL**: Relational database to store inventory, orders, and reservation data.
- **Jest**: Testing framework for writing unit and integration tests.
- **ESLint**: Linter for ensuring code quality.
- **dotenv**: Loads environment variables from a `.env` file for configuration.

---

## API Endpoints

### `GET /products`
Fetches a list of all products in the inventory.

**Response**:
```json
{
  "statusCode": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Product 1",
      "category": "Electronics",
      "price": 100,
      "stocks": 50
    }
  ]
}
```


### `POST /create-product`
Creates a new product in the inventory. The request body must include name, category, price, and stocks.

**Request**:
```json
{
  "name": "New Product",
  "category": "Electronics",
  "price": 200,
  "stocks": 100
}
```
**Response**:
```json
{
  "message": "success",
  "data": {
    "name": "New Product",
    "category": "Electronics",
    "price": 200,
    "stocks": 100
  }
}

```



### `GET /stock-levels/:productId`
Fetches the current stock levels for a specific product by its ID.

**Response**:
```json
{
  "message": "success",
  "data": {
    "product": {
      "id": 1,
      "name": "Product 1",
      "category": "Electronics",
      "price": 100,
      "stocks": 50
    }
  }
}

```



### `POST /update-stocks/:productId`
Updates the stock levels for a specific product.

**Request**:
```json
{
  "stocks": 60
}
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "name": "Product 1",
    "category": "Electronics",
    "price": 100,
    "stocks": 60
  }
}
```



### `POST /order-placed/:productId`
Places an order for a specific product, updating the stock level.

**Request**:
```json
{
  "quantity": 10
}
```
**Response**:
```json
{
  "message": "success",
  "data": {
    "quantity": 10,
    "productId": 1
  }
}
```


### `POST /reserve-stock/:productId`
Reserves stock for a specific product.

**Request**:
```json
{
  "quantity": 5
}
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "quantity": 5,
    "productId": 1
  }
}
```
## Project Setup


Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/your-username/inventory-management-api.git
cd inventory-management-api
```

### Install Dependencies
Install the necessary dependencies:

```bash 
npm install
```

## Running Tests

The tests for the controller are located in `app.controller.spec.ts`. To run the tests:

1. Run the Jest test runner:
   ```bash
   npm test
   ```

2. To run tests in watch mode:
   ```bash
   npm run test:watch
   ```

3. To generate a test coverage report:
   ```bash
   npm run test:cov
   ```

---

## Contributing

Contributions are welcome! Feel free to submit a pull request with bug fixes, improvements, or additional test cases.

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).