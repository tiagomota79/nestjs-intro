import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModules } from './products/products.module';

@Module({
  imports: [ProductsModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
