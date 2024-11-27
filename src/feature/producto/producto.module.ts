import { Module } from '@nestjs/common';
import { ProductoService } from './service/producto.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProductoController } from './controller/producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';

@Module({
  providers: [ProductoService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [ProductoController]
})
export class ProductoModule {}
