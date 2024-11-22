import { DetallePedido } from "src/entity/detallePedido";
import { DetallePedidoRequestDto } from "../dto/detalle-pedido.request/detalle-pedido.requestdto";
import { DetallePedidoResponseDto } from "../dto/detalle-pedido.response.dto";

export class DetallePedidoBuilder{
    private readonly detallePedido: DetallePedido;
    private readonly detallePedidoRequestDto: DetallePedidoRequestDto;

    constructor() {
        this.detallePedido = new DetallePedido();
        this.detallePedidoRequestDto = new DetallePedidoRequestDto();
    }

    public static toEntity(detallePedidoRequestDto: DetallePedidoRequestDto): DetallePedido {
        const detallePedido: DetallePedido = new DetallePedido(); 
        detallePedido.cantidad = detallePedidoRequestDto.cantidad;
        detallePedido.subTotal = detallePedidoRequestDto.subTotal;
        return detallePedido;
    }

    public static fromEntity(detallePedido: DetallePedido): DetallePedidoResponseDto {
        const detallePedidoResponseDto: DetallePedidoResponseDto = new DetallePedidoResponseDto(); 
        detallePedidoResponseDto.id = detallePedido.id;
        detallePedidoResponseDto.cantidad = detallePedido.cantidad;
        detallePedidoResponseDto.pedidoId = detallePedido.pedido.id;
        detallePedidoResponseDto.productoId = detallePedido.producto.id;
        detallePedidoResponseDto.subTotal = detallePedido.subTotal;
        return detallePedidoResponseDto;
    }
}