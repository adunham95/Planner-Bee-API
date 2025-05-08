import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import {
  InitiatePasswordResetDto,
  LoginDto,
  PasswordResetDto,
} from './dto/login.dto';
import { Request, Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  async loginToken(@Param('token') token: string) {
    const { accessToken } = await this.authService.getTokenData(token);
    console.log({ accessToken });
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
  async requestPassword(@Body() { password, token }: PasswordResetDto) {
    return this.authService.resetFromToken(password, token);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  user(@Req() req: Request) {
    return new UserEntity(req.user);
  }

  @Get('logout')
  // @ApiOkResponse({type: })
  logout(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    response.cookie('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: -1,
    });
    return { success: true };
  }
}
