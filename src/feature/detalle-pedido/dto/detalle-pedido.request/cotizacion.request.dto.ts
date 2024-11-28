import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { DetallePedidoRequestDto } from "./detalle-pedido.requestdto";

export class CotizacionRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  data: DetallePedidoRequestDto[];
}
