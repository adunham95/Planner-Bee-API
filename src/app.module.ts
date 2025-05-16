import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EcardTemplatesModule } from './ecard-templates/ecard-templates.module';
import { EcardComponentsModule } from './ecard-components/ecard-components.module';
import { CategoryModule } from './category/category.module';
import { EcardsModule } from './ecards/ecards.module';
import { OptionItemsModule } from './option-items/option-items.module';
import { ShopModule } from './shop/shop.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { RecipientsModule } from './recipients/recipients.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { BullModule } from '@nestjs/bull';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    PrismaModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
    EcardTemplatesModule,
    EcardComponentsModule,
    CategoryModule,
    EcardsModule,
    OptionItemsModule,
    ShopModule,
    StripeModule.forRootAsync(),
    ConfigModule.forRoot(),
    RecipientsModule,
    MailModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '2525'),
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_FROM,
      },
      template: {
        dir: process.cwd() + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '3000'),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
