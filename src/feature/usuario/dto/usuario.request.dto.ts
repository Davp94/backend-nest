import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class UsuarioRequestDto {
    @ApiProperty()
    @IsString()
    @Length(20)
    nombres: string;
    @ApiProperty()
    @IsString()
    apellidos: string;
    @ApiProperty()
    @IsString()
    @Matches("/^ [a-zA-Z0-9]*$/")
    password: string;
    @ApiProperty()
    @IsEmail()
    @Matches("/^ [a-zA-Z0-9]*$/blumbit.com")
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
    @Matches("/^ [a-zA-Z0-9]*$/")
    nit: string;
}