import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: (req: Request) => {
        console.log('jwt from request', req.cookies);
        if (req?.cookies?.accessToken) {
          console.log('has cookie');
          return req.cookies.accessToken as string;
        }

        const authHeader = req?.headers?.authorization;
        if (authHeader?.startsWith('Bearer ')) {
          return authHeader.slice(7);
        }

        return null;
      },
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { userId: number }) {
    console.log('validate');
    console.log({ payload });
    const user = await this.usersService.findOne(payload.userId);

    console.log({ user });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
