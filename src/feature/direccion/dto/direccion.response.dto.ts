import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DireccionResponseDto {
    id: number;
    zona: string;
    calle: string;
    nro: string;
    usuarioId: number;
}