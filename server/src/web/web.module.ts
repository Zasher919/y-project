import { Module, SetMetadata } from '@nestjs/common'
import { MODULE_PATH } from '@nestjs/common/constants'

import { WebController } from './web.controller'
import { WebService } from './web.service'

import { TestModule } from './test/test.module'
import { UsersModule } from './users/users.module'
import { AboutModule } from './about/about.module'
import { BannerModule } from './banner/banner.module'
import { ImgModule } from './img/img.module'
import { ProductsModule } from './products/product.module'
import { ProductCategoriesModule } from './product-categories/product-categories.module'
import { HomeModule } from './home/home.module'

// @SetMetadata(MODULE_PATH, 'admin')
@Module({
  imports: [HomeModule,TestModule,UsersModule,AboutModule,BannerModule,ImgModule,ProductsModule,ProductCategoriesModule],
  providers: [WebService],
  exports: [WebService],
  controllers: [WebController],
})
export class WebModule {}
