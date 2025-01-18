import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReserveStockDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
