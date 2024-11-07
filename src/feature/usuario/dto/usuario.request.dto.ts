import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class UsuarioRequestDto {
    @ApiProperty()
    @IsString()
    nombres: string;
    @ApiProperty()
    @IsString()
    apellidos: string;
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsEmail()
    correo: string;
    @ApiProperty()
    @IsString()
    username: string;
    @ApiProperty()
    @IsString()
    razonSocial: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nit: string;
}