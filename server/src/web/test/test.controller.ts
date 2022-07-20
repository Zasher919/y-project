// web 路由
import { Controller, Get } from '@nestjs/common'
import { TestService } from './test.service'

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) {}

  @Get()
  async test() {
    return await 'testTest'
  }
}
