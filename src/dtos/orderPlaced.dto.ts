import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class OrderPlacedDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
