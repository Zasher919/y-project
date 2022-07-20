// web 路由
import { Controller, Get } from '@nestjs/common'
import { WebService } from './web.service'

@Controller('web')
export class WebController {
  constructor(private readonly webService: WebService) {}

  @Get()
  async test() {
    return await 'test'
  }
}
