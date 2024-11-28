import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exception.filter';
import { CreatePedidoService } from '../service/create-pedido.service';
import { PedidoRequestDto } from '../dto/pedido.request.dto';
import { DataSource } from 'typeorm';

@Controller('pedido')
@UseFilters(HttpExceptionFilter)
export class PedidoController {

    constructor(private createPedidoService: CreatePedidoService, private datasource: DataSource){}
    @Post('')
    async createPedido(@Body() pedidoRequestDto: PedidoRequestDto): Promise<any>{
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const result = await this.createPedidoService.createPedido(pedidoRequestDto, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
