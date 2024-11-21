import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Direccion } from './direccion';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column("varchar", { length: 150, unique: true })
  nombres: string;
  @Column()
  apellidos: string;
  @Column("varchar", { length: 100, unique: true })
  correo: string;
  @Column()
  password: string;
  @Column()
  username: string;
  @Column()
  razonSocial: string;
  @Column()
  nit: string;

  @OneToMany(()=>Direccion, (direccion) => direccion.usuario)
  direcciones?: Direccion[];
}
