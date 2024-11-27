import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DetallePedidoService } from 'src/feature/detalle-pedido/service/detalle-pedido.service';
import { PedidoRequestDto } from '../dto/pedido.request.dto';
import { EntityManager } from 'typeorm';
import { Pedido } from 'src/entity/pedido';
import { DetallePedidoRequestDto } from 'src/feature/detalle-pedido/dto/detalle-pedido.request/detalle-pedido.requestdto';
import { Usuario } from 'src/entity/usuario';

@Injectable()
export class CreatePedidoService {

    constructor(private detallePedidoService: DetallePedidoService){
    }
    
    async createPedido(pedidoRequestDto: PedidoRequestDto, entityManager: EntityManager){
        try {
            const pedido: Pedido = new Pedido();
            pedido.fecha = new Date();
            pedido.total = this.calculateTotalPedido(pedidoRequestDto.detallePedido);
            pedido.usuario = await entityManager.findOne(Usuario, {where: {id: pedidoRequestDto.usuarioId}})
            const createdPedido = await entityManager.save(Pedido, pedido);
            console.log("🚀 ~ CreatePedidoService ~ createdPedido:", createdPedido)
            for(const detallePedido of pedidoRequestDto.detallePedido){
                await this.detallePedidoService.createDetallePedido(detallePedido, createdPedido.id, entityManager);
            }
            return {detail: createdPedido}
        } catch (error) {
            throw new HttpException('Error al crear Pedido', HttpStatus.BAD_REQUEST);
        }
    }

    calculateTotalPedido(detallePedidoRequestDto: DetallePedidoRequestDto[]): number {
        let total = 0;
        for(const detallePedido of detallePedidoRequestDto){
            total+=detallePedido.subTotal
        }
        return total;
    }

}
