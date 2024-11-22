import { Module } from '@nestjs/common';
import { DetallePedidoService } from './service/detalle-pedido.service';
import { DetallePedidoController } from './controller/detalle-pedido.controller';

@Module({
  providers: [DetallePedidoService],
  controllers: [DetallePedidoController],
  exports: [DetallePedidoService]
})
export class DetallePedidoModule {}
