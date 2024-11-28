import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { createCotizacionService } from '../service/create-cotizacion.service';
import { CotizacionRequestDto } from '../dto/detalle-pedido.request/cotizacion.request.dto';
import { Response } from 'express';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private createCotizacionService: createCotizacionService) {}

  @Post('cotizacion')
  async getCotizacion(
    @Body() cotizacionRequestDto: CotizacionRequestDto,
    @Res() response: Response,
  ): Promise<any> {
    const pdfCotizacion =
      await this.createCotizacionService.createCotizacion(cotizacionRequestDto);
    response.setHeader('Content-Type', 'application/pdf');
    pdfCotizacion.pipe(response);
    pdfCotizacion.end();
  }
}
