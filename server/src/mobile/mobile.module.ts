import { Module } from '@nestjs/common'


import { MobileController } from './mobile.controller'
import { MobileService } from './mobile.service'

import { H5UserModule } from './h5users/h5-user.module'
import { H5OperateModule } from './h5ProductOperate/h5-operate.module'
import { ProductModule } from './product/product.module'


@Module({
  imports: [ProductModule,H5UserModule,H5OperateModule],
  providers: [MobileService],
  exports: [MobileService],
  controllers: [MobileController],
})
export class MobileModule {}
