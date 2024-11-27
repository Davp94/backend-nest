import { ApiProperty } from '@nestjs/swagger';
import { ProductoResponseDto } from './producto.response.dto';

export class ProductoPaginationResponseDto {

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalRecords: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  sortParam: string;

  @ApiProperty()
  content: ProductoResponseDto[];
}