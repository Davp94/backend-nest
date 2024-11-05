import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioResponseDto } from '../dto/usuario.response.dto';
import { UsuarioRequestDto } from '../dto/usuario.request.dto';

@Controller('usuario')
export class UsuarioController {
    //A nivel de controlador no puede existir logica de negocio
    // 
    constructor(private usuarioService: UsuarioService){}

    @Get()
    async getUsuarios(): Promise<UsuarioResponseDto[]>{
        return await this.usuarioService.getAllUsuarios();
    }

    @Get(':usuarioId')
    async getUsuarioById(@Param() usuarioId: number): Promise<UsuarioResponseDto>{
        return await this.usuarioService.getOneById(usuarioId);
    }

    @Post('')
    async createUsuario(@Body() usuarioRequestDto: UsuarioRequestDto): Promise<UsuarioResponseDto>{
        return await this.usuarioService.saveUsuario(usuarioRequestDto);
    }

    @Put(':usuarioId')
    async updateUsuario(@Param() usuarioId: number, @Body() usuarioRequestDto: UsuarioRequestDto): Promise<number>{
        return await this.usuarioService.updateUsuario(usuarioRequestDto, usuarioId);
    }

    @Delete(':usuarioId')
    async deleteUsuario(@Param() usuarioId: number): Promise<number>{
        return await this.usuarioService.deleteUsuario(usuarioId);
    }
}