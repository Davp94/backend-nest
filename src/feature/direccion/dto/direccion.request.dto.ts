import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DireccionRequestDto {
    @ApiProperty()
    @IsString()
    zona: string;
    @ApiProperty()
    @IsString()
    calle: string;
    @ApiProperty()
    @IsString()
    nro: string;
}