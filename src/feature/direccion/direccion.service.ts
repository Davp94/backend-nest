import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from 'src/entity/direccion';
import { Repository } from 'typeorm';
import { DireccionRequestDto } from './dto/direccion.request.dto';
import { DireccionResponseDto } from './dto/direccion.response.dto';
import { Usuario } from 'src/entity/usuario';

@Injectable()
export class DireccionService {
    constructor(
        @InjectRepository(Direccion) private direccionRepository: Repository<Direccion>,
      ) {}

      async createDireccion(
        direccionRequest: DireccionRequestDto, usuario: Usuario
      ): Promise<DireccionResponseDto> {
        const direccionToCreate: Direccion = {
          id: 0,
          zona: direccionRequest.zona,
          calle: direccionRequest.calle,
          nro: direccionRequest.nro,
          usuario: usuario
        };
        const direccionCreated = await this.direccionRepository.save(direccionToCreate);
        const direccionRes: DireccionResponseDto = {
            id: direccionCreated.id,
            zona: direccionCreated.zona,
            calle: direccionCreated.calle,
            nro: direccionCreated.nro,
            usuarioId: usuario.id
        };
        return direccionRes;
      }
}
