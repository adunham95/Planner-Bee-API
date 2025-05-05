import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import {
  InitiatePasswordResetDto,
  LoginDto,
  PasswordResetDto,
} from './dto/login.dto';
import { Request, Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(email, password);
    console.log({ accessToken, secure: process.env.NODE_ENV === 'production' });
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    });
    return { accessToken };
  }

  @Get('token/:token')
  @ApiOkResponse({ type: AuthEntity })
  async loginToken(
    @Param('token') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.getTokenData(token);
    console.log({ accessToken, secure: process.env.NODE_ENV === 'production' });
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    });
    return { accessToken };
  }

  @Post('token')
  // @ApiOkResponse({ type: { loginToken } })
  async generateLoginToken(@Body() { userID }: { userID: number }) {
    const { loginToken } = await this.authService.generateToken(userID);

    return { loginToken };
  }

  @Post('request-reset')
  async requestPasswordReset(@Body() { email }: InitiatePasswordResetDto) {
    return this.authService.generateResetToken(email);
  }

  @Post('reset-password')
  async requestPassword(@Body() { password, token, email }: PasswordResetDto) {
    return this.authService.resetFromToken(email, password, token);
  }

  @Post('user')
  @ApiOkResponse({ type: AuthEntity })
  async user(@Req() req: Request) {
    const accessToken = (req.cookies?.accessToken as string) || null;

    console.log(accessToken);

    if (!accessToken) return false;

    const user = await this.authService.getUserFromAccessToken(accessToken);

    console.log(user);

    if (!user) return null;

    return new UserEntity(user);
  }
}
