import { ApiProperty } from "@nestjs/swagger";

export class PaginationSortingDto {
    @ApiProperty()
    take: number;
    @ApiProperty()
    page: number;
    @ApiProperty()
    sortDireccion: string;
    @ApiProperty()
    sortParam: string;
}