import { Module } from '@nestjs/common';
import { FindAllService } from './service/find-all-pedido.service';
import { CreatePedidoService } from './service/create-pedido.service';
import { PedidoController } from './controller/pedido.controller';
import { PedidoUnsafeController } from './controller/pedido-unsafe.controller';
import { DetallePedidoService } from '../detalle-pedido/service/detalle-pedido.service';
import { entities } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [FindAllService, CreatePedidoService, DetallePedidoService],
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [PedidoController, PedidoUnsafeController]
})
export class PedidoModule {}
