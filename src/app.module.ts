import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './feature/producto/producto.module';
import { UsuarioModule } from './feature/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entity';

@Module({
  imports: [
    UsuarioModule, 
    ProductoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'db_ecommerce',
      logging: true,
      entities: entities,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
