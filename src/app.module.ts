import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './feature/producto/producto.module';
import { UsuarioModule } from './feature/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entity';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './authentication/auth.module';
import { CryptoModule } from './common/crypto/crypto.module';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { UsuarioController } from './feature/usuario/controller/usuario.controller';
import { HttpExceptionFilter } from './exception/exception.filter';
import { DireccionModule } from './feature/direccion/direccion.module';
import { PedidoModule } from './feature/pedido/pedido.module';
import { DetallePedidoModule } from './feature/detalle-pedido/detalle-pedido.module';
import { CategoriaModule } from './feature/categoria/categoria.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    UsuarioModule, 
    ProductoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      entities: entities,
      synchronize: true,
    }),
    AuthModule,
    CryptoModule,
    DireccionModule,
    PedidoModule,
    DetallePedidoModule,
    CategoriaModule,
  ],
  controllers: [AppController, UsuarioController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes();
  }

  constructor(){}
}
