import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario';
import { Repository } from 'typeorm';
import { AuthRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async authUser(credentials: AuthRequestDto): Promise<AuthResponseDto> {
    const valid: boolean = await this.validateUsuario(credentials);
    const authResponse: AuthResponseDto = {token: ''};
    if(!valid){
        throw new Error('Error, credenciales inválidas')
    }
    const usuario: Usuario = await this.usuarioRepository.findOne({where: {correo: credentials.correo}});
    const payload = {uid: usuario.id, correo: usuario.correo, razonSocial: usuario.razonSocial};
    const token = await this.jwtService.signAsync(payload);
    authResponse.token = token;
    return authResponse;
  }

  async validateUsuario(credentials: AuthRequestDto): Promise<boolean> {
    let isValid: boolean = false;
    const usuario: Usuario = await this.usuarioRepository.findOne({
      where: { correo: credentials.correo },
    });
    if (usuario) {
      isValid = true;
      //TODO validate encrypt /decrypt password
      if (credentials.password != usuario.password) {
        isValid = false;
      }
    }
    return isValid;
  }
}
