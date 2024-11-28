import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DireccionRequestDto {
    @ApiProperty()
    @IsString()
    zona: string;
    @ApiProperty()
    @IsString( {
        message: 'Calle debe ser un numero entero',
      })
    calle: string;
    @ApiProperty()
    @IsString( {
        message: 'Calle debe ser un numero entero',
      })
    nro: string;
}