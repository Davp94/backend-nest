import { Module } from '@nestjs/common';
import { FindAllService } from './service/find-all-pedido.service';
import { CreateService } from './service/create-pedido.service';
import { PedidoController } from './controller/pedido.controller';
import { PedidoUnsafeController } from './controller/pedido-unsafe.controller';
import { DetallePedidoService } from '../detalle-pedido/service/detalle-pedido.service';

@Module({
  providers: [FindAllService, CreateService, DetallePedidoService],
  controllers: [PedidoController, PedidoUnsafeController]
})
export class PedidoModule {}
