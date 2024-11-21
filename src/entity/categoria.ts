import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 150 })
  nombre: string;

  @Column()
  descripcion: string;

}
