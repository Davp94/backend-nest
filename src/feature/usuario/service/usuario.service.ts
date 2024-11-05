import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario';
import { Repository } from 'typeorm';
import { UsuarioResponseDto } from '../dto/usuario.response.dto';
import { UsuarioRequestDto } from '../dto/usuario.request.dto';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>){
    }

    async getAllUsuarios(): Promise<UsuarioResponseDto[]> {
        const usuariosResponse: UsuarioResponseDto[] = [];
        const usuarios: Usuario[] = await this.usuarioRepository.find({});
        usuarios.forEach(usuario => {
            const usuarioRes: UsuarioResponseDto = {
                id: usuario.id,
                correo: usuario.correo,
                nombreCompleto: usuario.nombres + ' ' + usuario.apellidos,
                username: usuario.username,
                nit: usuario.nit,
                razonSocial: usuario.razonSocial
            }
            usuariosResponse.push(usuarioRes);
        });
        return usuariosResponse;
    }

    async getOneById(usuarioId: number): Promise<UsuarioResponseDto> {
        const usuario: Usuario = await this.usuarioRepository.findOne({where: {id: usuarioId}});
        const usuarioRes: UsuarioResponseDto = {
            id: usuario.id,
            correo: usuario.correo,
            nombreCompleto: usuario.nombres + ' ' + usuario.apellidos,
            username: usuario.username,
            nit: usuario.nit,
            razonSocial: usuario.razonSocial
        }
        return usuarioRes;
    }

    async saveUsuario(usuarioRequestDto: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        const usuarioToCreate: Usuario = {
            id: 0,
            nombres: usuarioRequestDto.nombres,
            apellidos: usuarioRequestDto.apellidos,
            razonSocial: usuarioRequestDto.razonSocial,
            password: usuarioRequestDto.password,
            correo: usuarioRequestDto.correo,
            nit: usuarioRequestDto.nit,
            username: usuarioRequestDto.username
        }
        const usuarioCreated = await this.usuarioRepository.save(usuarioToCreate);
        const usuarioRes: UsuarioResponseDto = {
            id: usuarioCreated.id,
            correo: usuarioCreated.correo,
            nombreCompleto: usuarioCreated.nombres + ' ' + usuarioCreated.apellidos,
            username: usuarioCreated.username,
            nit: usuarioCreated.nit,
            razonSocial: usuarioCreated.razonSocial
        }
        return usuarioRes;
    }

    async updateUsuario(usuario: UsuarioRequestDto, usuarioId: number): Promise<number> {        
        await this.usuarioRepository.update(usuarioId, usuario);
        return usuarioId;
    }

    async deleteUsuario(usuarioId: number): Promise<number> {
        await this.usuarioRepository.delete(usuarioId);
        return usuarioId;
    }
}
