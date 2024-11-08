import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if(req.headers.authorization) {
      const token = req.headers.authorization;
      console.log("🚀 ~ AuthMiddleware ~ use ~ token:", token);
    }else {
      throw new BadRequestException('NO EXISTE TOKEN DE AUTHENTICACION');
    }
    next();
  }
}
