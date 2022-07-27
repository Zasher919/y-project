import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';



import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrederController } from './order.controller';


@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrederController],
  providers: [OrderService]
})
export class OrederModule {}
