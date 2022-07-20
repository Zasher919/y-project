 import {  Module } from '@nestjs/common';
 import { CatsService } from './cats.service';
 import { HttpModule } from '@nestjs/axios'
 import { CatsController } from './cats.controller';


@Module({
  imports: [ HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),],
  providers: [CatsService],
  controllers: [CatsController],
  exports: [],
})
export class CatsModule {};