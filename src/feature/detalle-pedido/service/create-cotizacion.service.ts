import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Producto } from 'src/entity/producto';
import { CotizacionRequestDto } from '../dto/detalle-pedido.request/cotizacion.request.dto';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class createCotizacionService {
  constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>) {}

  async createCotizacion(cotizacionRequestDto: CotizacionRequestDto): Promise<PDFKit.PDFDocument>{
    for(const detallePedido of cotizacionRequestDto.data){
        detallePedido.productoNombre = (await this.productoRepository.find({where: {id: detallePedido.productoId}}))[0].nombre
    }
    console.log(cotizacionRequestDto);
    const fonts = {
        Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
    }
    
    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
        pageSize: 'LETTER',
        header: {
            text: 'Cotización',
            alignment: 'right',
            margin: [10,10]
        },
        content: [
            {
                margin: [0, 20],
                layout: 'lightHorizontalLines',
                table: {
                    widths: [200, '*', 50, 50, 50, 50],
                    headerRows: 1,
                    body: [
                        ['ID', 'Nombre', 'Cantidad', 'SubTotal'],
                        ...cotizacionRequestDto.data.map(cotizacion => [cotizacion.productoId, cotizacion.productoNombre, cotizacion.cantidad, cotizacion.subTotal])
                    ]
                }
            }
        ]
    }
    const options =  {}
    return printer.createPdfKitDocument(docDefinition, options);
  }
 
}
