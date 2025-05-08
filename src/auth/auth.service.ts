import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  generateLoginToken,
  generateResetTokenString,
} from 'src/utils/generateLoginToken';
import { getTimeFifteenMinutesFromNow } from 'src/utils/timeFuntions';

interface Payload {
  userId: number;
}
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.userService.findByEmail(email);

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async resetFromToken(
    password: string,
    resetToken: string,
  ): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const token = await this.prisma.resetToken.findFirst({
      where: { token: resetToken },
    });

    // TODO check expiration on token

    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }

    await this.userService.update(token.userID, { password });

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: token.userID }),
    };
  }

  async getUserFromAccessToken(accessToken: string): Promise<User | null> {
    const payload: Payload = this.jwtService.decode(accessToken);

    if (!payload) {
      throw new UnauthorizedException('No data');
    }

    const user = await this.userService.findOne(payload.userId);

    console.log('Get user from token', user, payload);

    return user;
  }

  async getTokenData(token: string): Promise<AuthEntity> {
    const tokenData = await this.prisma.loginToken.findUnique({
      where: { token },
    });

    if (tokenData === null || !tokenData.userID) {
      throw new UnauthorizedException('No data');
    }

    return {
      accessToken: this.jwtService.sign({ userId: tokenData.userID }),
    };
  }

  async generateToken(userID: number): Promise<{ loginToken: string }> {
    const loginToken = generateLoginToken();
    await this.prisma.loginToken.create({
      data: {
        userID,
        token: loginToken,
        expirationDate: getTimeFifteenMinutesFromNow(),
      },
    });

    return {
      loginToken,
    };
  }

  async generateResetToken(
    email: string,
  ): Promise<{ success: boolean; token?: string }> {
    const resetToken = await generateResetTokenString();

    const user = await this.userService.findByEmail(email);

    if (!user || user === null) {
      console.log('No User Found');
      return { success: false };
    }

    await this.prisma.resetToken.upsert({
      where: { userID: user.id },
      update: {
        token: resetToken.token,
        expirationDate: getTimeFifteenMinutesFromNow(),
      },
      create: {
        userID: user.id,
        token: resetToken.token,
        expirationDate: getTimeFifteenMinutesFromNow(),
      },
    });

    return { success: true, token: resetToken.token };
  }
}
