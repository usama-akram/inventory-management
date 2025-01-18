# NestJS Controller Test Suite

This repository contains test cases for a NestJS application controller using Jest. The test suite validates the functionality of the following endpoints:

- `GET /stock-levels/:productId`
- `POST /update-stock`
- `POST /order-placed`
- `POST /reserve-stock`

---

## Project Structure

### Files

- **`app.controller.ts`**: Contains the controller methods for handling requests.
- **`app.controller.spec.ts`**: Jest test file for `AppController`.
- **`app.service.ts`**: Service methods that handle business logic.
- **`dto/`**: Folder containing Data Transfer Objects (DTOs) used for request validation.
- **`product.entity.ts`**: Entity representing a product in the database.

### Endpoints

1. **`GET /stock-levels/:productId`**
   - Fetches the stock levels for a given product.
   - Returns a `Product` object.

2. **`POST /update-stock`**
   - Updates the stock levels of a product based on the provided data.
   - Accepts a `UpdateStockDto` object in the request body.
   - Returns a success message.

3. **`POST /order-placed`**
   - Handles an order placement event.
   - Accepts an `OrderPlacedDto` object in the request body.
   - Returns a confirmation message.

4. **`POST /reserve-stock`**
   - Reserves stock for an order.
   - Accepts a `ReserveStockDto` object in the request body.
   - Returns a success message.

---

## Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/): Version 14 or above.
- [NestJS CLI](https://nestjs.com/): For running and managing the application.
- [Jest](https://jestjs.io/): For running the test suite.

Install project dependencies:

```bash
npm install
```

---

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

## Test Details

### Mocking
The `AppService` methods are mocked using `jest.fn()` to isolate the controller logic. This ensures that the tests focus solely on the controller's functionality.

### Assertions
Each test case:
- Verifies the method calls with the correct arguments.
- Confirms the returned values match the expected results.

### DTO Validation
The test suite includes DTOs for validating incoming request payloads, ensuring that data consistency is maintained.

---

## Example Test Cases

### `GET /stock-levels/:productId`
Fetches the stock levels for a given product.

**Test Implementation:**
```typescript
it('should return the product stocks', async () => {
  const mockProduct: Product = { id: 1, name: 'Sample Product', quantity: 100 };
  jest.spyOn(appService, 'productStocks').mockResolvedValue(mockProduct);

  const result = await appController.getProductStocks('1');
  expect(result).toEqual(mockProduct);
  expect(appService.productStocks).toHaveBeenCalledWith('1');
});
```

### `POST /update-stock`
Updates product stock levels and returns a success message.

**Test Implementation:**
```typescript
it('should update product stocks and return a success message', async () => {
  const updateStockDto: UpdateStockDto = {
    eventType: 'stockUpdate',
    productId: '1',
    quantity: 10,
    timestamp: '2025-01-18T12:00:00Z',
  };

  jest.spyOn(appService, 'updateStocks').mockResolvedValue('Stock updated successfully');

  const result = await appController.updateProductStocks(updateStockDto);
  expect(result).toBe('Stock updated successfully');
  expect(appService.updateStocks).toHaveBeenCalledWith(updateStockDto);
});
```

---

## Troubleshooting

### Common Issues
1. **Validation Errors:** Ensure the global validation pipe is enabled in `main.ts`.
   ```typescript
   app.useGlobalPipes(new ValidationPipe());
   ```

2. **Mock Implementation Issues:** Check that the mocked methods in the test file align with the service method signatures.

3. **Entity Metadata Errors:** Ensure all entities are properly imported in `TypeOrmModule`.

---

## Contributing

Contributions are welcome! Feel free to submit a pull request with bug fixes, improvements, or additional test cases.

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
