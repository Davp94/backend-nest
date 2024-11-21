import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario';

@Entity()
export class Pedido {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 150 })
  fecha: Date;

  @Column()
  total: number;

  @ManyToOne(()=>Usuario)
  usuario: Usuario;

}