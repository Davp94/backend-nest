import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario';
import { Repository } from 'typeorm';
import { UsuarioResponseDto } from '../dto/usuario.response.dto';
import { UsuarioRequestDto } from '../dto/usuario.request.dto';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { DireccionService } from 'src/feature/direccion/direccion.service';
import { DireccionRequestDto } from 'src/feature/direccion/dto/direccion.request.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private cryptoService: CryptoService, private direccionService: DireccionService
  ) {}

  async getAllUsuarios(): Promise<UsuarioResponseDto[]> {
    const usuariosResponse: UsuarioResponseDto[] = [];
    const usuarios: Usuario[] = await this.usuarioRepository.find({});
    usuarios.forEach((usuario) => {
      const usuarioRes: UsuarioResponseDto = {
        id: usuario.id,
        correo: usuario.correo,
        nombreCompleto: usuario.nombres + ' ' + usuario.apellidos,
        username: usuario.username,
        nit: usuario.nit,
        razonSocial: usuario.razonSocial,
      };
      usuariosResponse.push(usuarioRes);
    });
    return usuariosResponse;
  }

  async getOneById(usuarioId: number): Promise<UsuarioResponseDto> {
    try {
      const usuario: Usuario = await this.usuarioRepository.findOne({
        where: { id: usuarioId },
      });
      const usuarioRes: UsuarioResponseDto = {
        id: usuario.id,
        correo: usuario.correo,
        nombreCompleto: usuario.nombres + ' ' + usuario.apellidos,
        username: usuario.username,
        nit: usuario.nit,
        razonSocial: usuario.razonSocial,
      };
      return usuarioRes;
    } catch (error) {
      console.log("🚀 ~ UsuarioService ~ getOneById ~ error:", error)
      throw new Error('usuario no encontrado');
    }
  }

  async saveUsuario(
    usuarioRequestDto: UsuarioRequestDto,
  ): Promise<UsuarioResponseDto> {
    try {
      const usuarioToCreate: Usuario = {
        id: 0,
        nombres: usuarioRequestDto.nombres,
        apellidos: usuarioRequestDto.apellidos,
        razonSocial: usuarioRequestDto.razonSocial,
        password: await this.cryptoService.encryptData(
          usuarioRequestDto.password,
        ),
        correo: usuarioRequestDto.correo,
        nit: usuarioRequestDto.nit,
        username: usuarioRequestDto.username,
      };
      const usuarioCreated = await this.usuarioRepository.save(usuarioToCreate);
      for (const direccion of usuarioRequestDto.direcciones) {
        await this.direccionService.createDireccion(direccion, usuarioCreated);
      }
  
      const usuarioRes: UsuarioResponseDto = {
        id: usuarioCreated.id,
        correo: usuarioCreated.correo,
        nombreCompleto: usuarioCreated.nombres + ' ' + usuarioCreated.apellidos,
        username: usuarioCreated.username,
        nit: usuarioCreated.nit,
        razonSocial: usuarioCreated.razonSocial,
      };
      return usuarioRes;
    } catch (error) {
      console.log("🚀 ~ UsuarioService ~ error:", error)
      throw new BadRequestException('Error al crear el usuario');
    }
   
  }

  async updateUsuario(
    usuarioRequestDto: UsuarioRequestDto,
    usuarioId: number,
  ): Promise<number> {
    const usuarioToUpdate: Usuario = {
      nombres: usuarioRequestDto.nombres,
      apellidos: usuarioRequestDto.apellidos,
      razonSocial: usuarioRequestDto.razonSocial,
      password: await this.cryptoService.encryptData(
        usuarioRequestDto.password
      ),
      correo: usuarioRequestDto.correo,
      nit: usuarioRequestDto.nit,
      username: usuarioRequestDto.username,
    };
    await this.usuarioRepository.update(usuarioId, usuarioToUpdate);
    return usuarioId;
  }

  async deleteUsuario(id: number): Promise<number> {
    await this.usuarioRepository.delete(id);
    return id;
  }
}
