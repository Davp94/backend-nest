import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;
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
}
