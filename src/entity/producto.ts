import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria';

@Entity()
export class Producto {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 150 })
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @Column()
  img: string;

  @ManyToOne(()=>Categoria)
  categoria: Categoria;

}