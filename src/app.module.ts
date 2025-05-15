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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
