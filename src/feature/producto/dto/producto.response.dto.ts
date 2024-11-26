import { ApiProperty } from '@nestjs/swagger';
import { ProductoRequestDto } from './producto.request.dto';

export class ProductoResponseDto extends ProductoRequestDto{
  @ApiProperty()
  id: number;
}
