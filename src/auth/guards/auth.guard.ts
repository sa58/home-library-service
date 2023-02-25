import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
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

    try {
      const { authorization } = request['headers'];
      const [_, token] = authorization.split(' ');

      return this.validateToken(token);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async validateToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET_KEY});

      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}