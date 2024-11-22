import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePedido } from 'src/entity/detallePedido';
import { ProductoService } from 'src/feature/producto/service/producto.service';
import { EntityManager, LessThan, Repository } from 'typeorm';
import { DetallePedidoRequestDto } from '../dto/detalle-pedido.request/detalle-pedido.requestdto';
import { DetallePedidoBuilder } from '../builder/detalle-pedido.builder';
import { Producto } from 'src/entity/producto';
import { Pedido } from 'src/entity/pedido';
import { DetallePedidoResponseDto } from '../dto/detalle-pedido.response.dto';

@Injectable()
export class DetallePedidoService {
  constructor() {}

  async createDetallePedido(detallePedidoRequestDto: DetallePedidoRequestDto, pedidoId: number, entityManager: EntityManager): Promise<DetallePedidoResponseDto>{

    let detallePedido: DetallePedido = DetallePedidoBuilder.toEntity(detallePedidoRequestDto);
    detallePedido.producto = await entityManager.findOne(Producto, {where: {id: detallePedidoRequestDto.productoId}});
    detallePedido.pedido = await entityManager.findOne(Pedido, {where: {id: pedidoId}});
    return DetallePedidoBuilder.fromEntity(await entityManager.save(DetallePedido, detallePedido));
  }

}
