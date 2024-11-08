import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { HttpExceptionFilter } from 'src/exception/exception.filter';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async loginUser(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto>{
        return await this.authService.authUser(authRequestDto);
    }
}
