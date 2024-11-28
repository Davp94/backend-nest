import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DetallePedidoRequestDto {

  @ApiProperty()
  @IsNumber()
  productoId: number;

  productoNombre?: string;

  @ApiProperty()
  @IsNumber()
  subTotal: number;

  @ApiProperty()
  @IsNumber()
  cantidad: number;
}
