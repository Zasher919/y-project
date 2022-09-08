import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { H5OperateEntity } from './h5-operate.entity'
import { H5OperateService } from './h5-operate.service'
import { H5OperateController } from './h5-operate.controller'
import { ProductCategoriesModule } from 'src/web/product-categories/product-categories.module'
import { ProductsModule } from 'src/web/products/product.module'

@Module({
  imports: [ProductCategoriesModule, ProductsModule, TypeOrmModule.forFeature([H5OperateEntity])],
  providers: [H5OperateService],
  controllers: [H5OperateController],
  exports: [],
})
export class H5OperateModule {}
