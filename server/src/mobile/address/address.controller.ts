import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'

import { AddressService } from './address.service'
import { CreateAddressrDto } from './dto/create-address.dto'

import { ResultData } from 'src/libs/result'

@Controller('api/h5/address')
export class AddressController {
  constructor(private readonly AddressService: AddressService) {}

  @Post()
  async create(@Body() data: CreateAddressrDto): Promise<ResultData> {
    console.log(data, 'data')
    return await this.AddressService.create(data)
  }

  @Put()
  async update(@Body() data: any): Promise<ResultData> {
    return await this.AddressService.update(data)
  }

  @Delete(':id')
  async delete(@Param('id') id: any): Promise<ResultData> {
    return await this.AddressService.delete(id)
  }

  @Get()
  async find(@Query() user: any): Promise<ResultData> {
    return await this.AddressService.find(user)
  }
}
