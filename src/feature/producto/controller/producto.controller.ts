import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductoService } from '../service/producto.service';
import { ProductoPaginationResponseDto } from '../dto/product-pagination.response.dto';
import { ProductoRequestDto } from '../dto/producto.request.dto';
import { PaginationSortingDto } from 'src/common/dto/pagination-sorting.dto';
import { ProductoResponseDto } from '../dto/producto.response.dto';

@Controller('producto')
export class ProductoController {

  constructor(private productoService: ProductoService){

  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const suffix = Date.now()+'-'+Math.round(Math.random()*1e9);
            const imgName = file.originalname;
            callback(null, `${imgName.split('.')[0]}-${suffix}${extname(imgName)}}`)
        }
    })
  }))
  async uploadFile(@UploadedFile() file) {
    if(!file){
        throw new HttpException('Archivo no encontrado', HttpStatus.BAD_REQUEST)
    }
    return { file: file.fileName }
  }

  @Get('')
  async findAllProductPagination(@Query() paginationSortingDto: PaginationSortingDto): Promise<ProductoPaginationResponseDto>{
    return await this.productoService.findAllProductos(paginationSortingDto);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const suffix = Date.now()+'-'+Math.round(Math.random()*1e9);
            const imgName = file.originalname;
            callback(null, `${imgName.split('.')[0]}-${suffix}${extname(imgName)}}`)
        }
    })
  }))
  async createProducto(@Body() productoRequestDto: ProductoRequestDto, @UploadedFile() file: Express.Multer.File): Promise<ProductoResponseDto>{
    return await this.productoService.createProducto(productoRequestDto, file.filename);
  }
}
