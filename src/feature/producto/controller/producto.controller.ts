import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('producto')
export class ProductoController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './uploads',
        fileName: (req, file, callback) => {
            const suffix = Date.now()+'-'+Math.round(Math.random()*1e9);
            const imgName = file.originalName;
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
}
