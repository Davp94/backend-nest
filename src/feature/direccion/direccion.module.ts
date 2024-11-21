import { Module } from '@nestjs/common';
import { DireccionController } from './direccion.controller';
import { DireccionService } from './direccion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';

@Module({
  controllers: [DireccionController],
  providers: [DireccionService],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [DireccionService]
})
export class DireccionModule {}
