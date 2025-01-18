import { IsString, IsInt, IsISO8601, IsIn, IsNotEmpty } from 'class-validator';

export class UpdateStockDto {
  // @IsString()
  // @IsIn(['stockUpdate', 'orderPlaced'], {
  //   message: 'eventType must be either "stockUpdate" or "orderPlaced"',
  // })
  // eventType: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

//   @IsISO8601({}, { message: 'timestamp must be in ISO 8601 format' })
//   timestamp: string;
}
