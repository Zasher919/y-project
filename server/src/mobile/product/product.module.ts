import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductController } from './product.controller'

import { ProductService } from './product.service'

import { ProductEntity } from './product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}
