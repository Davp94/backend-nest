import { Module } from '@nestjs/common';
import { DetallePedidoService } from './service/detalle-pedido.service';
import { DetallePedidoController } from './controller/detalle-pedido.controller';
import { ReportService } from './service/report.service';

@Module({
  providers: [DetallePedidoService, ReportService],
  controllers: [DetallePedidoController],
  exports: [DetallePedidoService]
})
export class DetallePedidoModule {}
