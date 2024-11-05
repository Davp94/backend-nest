import { Module } from '@nestjs/common';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './service/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [UsuarioService]
})
export class UsuarioModule {}