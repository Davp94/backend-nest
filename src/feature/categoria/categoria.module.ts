import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { entities } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CategoriaController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [CategoriaService]
})
export class CategoriaModule {}
