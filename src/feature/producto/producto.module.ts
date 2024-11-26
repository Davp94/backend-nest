import { Module } from '@nestjs/common';
import { ProductoService } from './service/producto.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProductoController } from './controller/producto.controller';

@Module({
  providers: [ProductoService],
  imports: [
    MulterModule.register({ dest: './uploads' })
  ],
  controllers: [ProductoController]
})
export class ProductoModule {}
