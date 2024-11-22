import { Module } from '@nestjs/common';
import { ProductoService } from './service/producto.service';

@Module({
  providers: [ProductoService]
})
export class ProductoModule {}
