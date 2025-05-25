import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot(), PrismaModule],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_SECRET',
          useFactory: (configService: ConfigService) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            configService.get('STRIPE_API_SECRET'),
          inject: [ConfigService],
        },
        {
          provide: 'FRONT_END_URL',
          useFactory: (configService: ConfigService) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            configService.get('FRONT_END_URL'),
          inject: [ConfigService],
        },
      ],
    };
  }
}
