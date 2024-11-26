import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entity/producto';
import { Repository } from 'typeorm';
import { ProductoRequestDto } from '../dto/producto.request.dto';
import { ProductoResponseDto } from '../dto/producto.response.dto';
import { Categoria } from 'src/entity/categoria';
import { PaginationSortingDto } from 'src/common/dto/pagination-sorting.dto';

@Injectable()
export class ProductoService {
    constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>,
    @InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>){

    }

    async findAllProductos(paginationSortingDto: PaginationSortingDto): Promise<ProductoResponseDto[]>{
        const productos: Producto[] = await this.productoRepository.find({
            relations: {categoria: true},
            order: {[paginationSortingDto.sortParam]: paginationSortingDto.sortDireccion},
            take: Number(paginationSortingDto.take),
            skip: paginationSortingDto.take * paginationSortingDto.page,
            where: {}
        });
        return productos.map(producto => {
            return {
                id: producto.id,
                categoriaId: producto.categoria.id,
                nombre: producto.nombre,
                precio: producto.precio,
                img: producto.img,
                descripcion: producto.descripcion
            }
        })
    }

    async createProducto(productoRequestDto: ProductoRequestDto): Promise<ProductoResponseDto>{
        const producto: Producto = new Producto();
        producto.categoria = await this.categoriaRepository.findOneBy({id: productoRequestDto.categoriaId});
        producto.descripcion = productoRequestDto.descripcion;
        //TODO add img service
        producto.img = '';
        producto.nombre = productoRequestDto.nombre;
        producto.precio = productoRequestDto.precio;
        const productoSaved = await this.productoRepository.save(producto);
        return {
            id: productoSaved.id,
            categoriaId: productoSaved.categoria.id,
            nombre: productoSaved.nombre,
            precio: productoSaved.precio,
            img: productoSaved.img,
            descripcion: productoSaved.descripcion
        }

    }
}
