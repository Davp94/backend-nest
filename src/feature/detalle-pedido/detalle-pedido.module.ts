import { Module } from '@nestjs/common';
import { DetallePedidoService } from './service/detalle-pedido.service';
import { DetallePedidoController } from './controller/detalle-pedido.controller';
import { entities } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createCotizacionService } from './service/create-cotizacion.service';

@Module({
  providers: [DetallePedidoService, createCotizacionService],
  controllers: [DetallePedidoController],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [DetallePedidoService]
})
export class DetallePedidoModule {}
