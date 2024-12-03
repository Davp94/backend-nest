import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from 'src/entity/categoria';

@Controller('categoria')
export class CategoriaController {

    constructor(private categoriaService: CategoriaService){
    }

    @Get()
    async getCategorias(): Promise<Categoria[]>{
        return await this.categoriaService.getAllCategorias();
    }
}
