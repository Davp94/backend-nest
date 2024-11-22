import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
} from 'class-validator';
import { DetallePedidoRequestDto } from 'src/feature/detalle-pedido/dto/detalle-pedido.request/detalle-pedido.requestdto';

export class PedidoRequestDto {

  @ApiProperty()
  @IsNumber()
  usuarioId: number;

  @ApiProperty()
  detallePedido: DetallePedidoRequestDto[];
}
