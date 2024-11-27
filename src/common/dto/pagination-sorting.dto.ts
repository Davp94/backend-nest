import { ApiProperty } from "@nestjs/swagger";
import { OrderEnum } from "../constant/order.enum";
import { IsEnum } from "class-validator";

export class PaginationSortingDto {
    @ApiProperty()
    take: number;
    @ApiProperty()
    page: number;
    @ApiProperty()
    @IsEnum(OrderEnum)
    sortDireccion: OrderEnum;
    @ApiProperty()
    sortParam: string;
}