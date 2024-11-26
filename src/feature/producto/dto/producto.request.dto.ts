import { ApiProperty } from '@nestjs/swagger';

export class ProductoRequestDto {

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  img: string;

  @ApiProperty()
  categoriaId: number;
}