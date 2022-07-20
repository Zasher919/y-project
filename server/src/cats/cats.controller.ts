
import { Controller, Get, Query } from "@nestjs/common";
import { CatsService } from "./cats.service";

@Controller('api/wxlogin')
export class CatsController{
  constructor(
    private readonly CatsService:CatsService
  ){}

  @Get()
  async wxlogin(@Query() data:any){
    
    
    return await this.CatsService.wxlogin(data)
  }
}