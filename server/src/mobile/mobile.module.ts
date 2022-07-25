import { Module } from '@nestjs/common'


import { MobileController } from './mobile.controller'
import { MobileService } from './mobile.service'

import { H5UserModule } from './h5users/h5-user.module'
import { H5OperateModule } from './h5ProductOperate/h5-operate.module'
import { ProductModule } from './product/product.module'
import { ProductCategoriesModule } from 'src/web/product-categories/product-categories.module'
import { AddressModule } from './address/address.module';



@Module({
  imports: [ProductModule,H5UserModule,H5OperateModule,ProductCategoriesModule, AddressModule],
  providers: [MobileService],
  exports: [MobileService],
  controllers: [MobileController],
})
export class MobileModule {}
