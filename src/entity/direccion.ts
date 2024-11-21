import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario';

@Entity()
export class Direccion {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 150 })
  zona: string;

  @Column()
  calle: string;

  @Column("varchar", { length: 100 })
  nro: string;

  @ManyToOne( ()=>Usuario, (usuario) => usuario.direcciones)
  usuario: Usuario;
}
