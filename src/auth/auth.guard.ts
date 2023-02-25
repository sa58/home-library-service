import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const { authorization } = request['headers'];
    const [_, token] = authorization.split(' ');

    return this.validateToken(token);
  }

  async validateToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET_KEY});

      return true;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}