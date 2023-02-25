import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if(!refreshToken) {
      throw new UnauthorizedException('UnauthorizedException');
    }

    try {
      return this.validateToken(request.body.refreshToken);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async validateToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET_REFRESH_KEY});

      return true;
    } catch (err) {
        throw new ForbiddenException(err.message);
    }
  }
}
