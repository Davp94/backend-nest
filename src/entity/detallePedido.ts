import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from './pedido';
import { Producto } from './producto';

@Entity()
export class DetallePedido {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 150 })
  cantidad: number;

  @Column()
  subTotal: number;

  @Column("varchar", { length: 100 })
  nro: string;

  @ManyToOne(()=>Pedido)
  pedido: Pedido;

  @ManyToOne(()=>Producto)
  producto: Producto;
}
