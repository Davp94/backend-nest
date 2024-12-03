import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/entity/categoria';
import { Repository } from 'typeorm';
import { CategoriaResponseDto } from './dto/categoria.response.dto';

@Injectable()
export class CategoriaService {
    constructor(@InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>){
    }

    async getAllCategorias(): Promise<CategoriaResponseDto[]> {
        const categorias: Categoria[] = await this.categoriaRepository.find();
        return categorias;
    }
}
