import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario';
import { Repository } from 'typeorm';
import { AuthRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { CustomHttpException } from 'src/exception/custom-http.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async authUser(credentials: AuthRequestDto): Promise<AuthResponseDto> {
    const valid: boolean = await this.validateUsuario(credentials);
    const authResponse: AuthResponseDto = {token: ''};
    if(!valid){
        throw new CustomHttpException('Error, credenciales inválidas', HttpStatus.UNAUTHORIZED)
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
      if (usuario.password != await this.cryptoService.encryptData(credentials.password)) {
        isValid = false;
      }
    }
    return isValid;
  }
}
