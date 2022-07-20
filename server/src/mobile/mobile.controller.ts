// web 路由
import { Controller, Get } from '@nestjs/common'
import { MobileService } from './mobile.service'

@Controller('h5')
export class MobileController {
  constructor(private readonly MobileService: MobileService) {}

  @Get()
  async test() {
    return await 'test'
  }
}
