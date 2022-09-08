// web 路由
import { Controller, Get } from '@nestjs/common'
import { MobileService } from './mobile.service'
import { ProductCategoriesService } from 'src/web/product-categories/product-categories.service'
@Controller('/api/h5')
export class MobileController {
  constructor(private readonly MobileService: MobileService, private readonly ProductCategoriesService: ProductCategoriesService) {}

  @Get('test')
  async test() {
    return 'mobiletest'
  }

  @Get('loginout')
  async loginout() {
    return await this.MobileService.loginout()
  }
}
