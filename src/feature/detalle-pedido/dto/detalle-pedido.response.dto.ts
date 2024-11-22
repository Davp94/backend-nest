import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DetallePedidoResponseDto {

  @ApiProperty()
  id: number;  

  @ApiProperty()
  @IsNumber()
  productoId: number;

  @ApiProperty()
  @IsNumber()
  subTotal: number;

  @ApiProperty()
  @IsNumber()
  cantidad: number;

  @ApiProperty()
  pedidoId: number;
}
