import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common'

// import { ApiResult } from 'src/common/decorators/api-result.decorator'
import { ResultData } from 'src/libs/result'

import { ImgEntity } from './img.entity'
import { ImgService } from './img.service'

import { CreateImgDto } from './dto/create-img.dto'
import { UpdateImgDto } from './dto/undate-img.dto'
import { FindImgDto } from './dto/find-img.dto'

@Controller('api/img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  async create(@Body() dto: CreateImgDto): Promise<ResultData> {
    return this.imgService.create(dto)
  }

  @Put()
  async update(@Body() dto: UpdateImgDto): Promise<ResultData> {
    return this.imgService.update(dto)
  }

  @Get()
  async find(@Query() search: FindImgDto): Promise<ResultData> {
    console.log('get suc')

    return this.imgService.find(search)
  }

  @Get(':type')
  async findH5(@Param('type') type: string): Promise<ResultData> {
    return this.imgService.findImgType(type)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResultData> {
    return this.imgService.delete(id)
  }
}
