import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common'

// import { ApiResult } from 'src/common/decorators/api-result.decorator'
// import { ResultData } from 'src/libs/result'

import { ProductEntity } from './product.entity'
import { ProductService } from './product.service'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FindProductDto } from './dto/find-product.dto'

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(dto)
  }

  @Put()
  async update(@Body() dto: UpdateProductDto): Promise<ProductEntity> {
    return this.productService.update(dto)
  }

  @Get()
  async find(@Query() search: FindProductDto): Promise<ProductEntity> {
    console.log('code-executed', search)
    return this.productService.find(search)
  }

  @Get('h5')
  async findH5(): Promise<ProductEntity> {
    return this.productService.findH5All()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.delete(id)
  }
}
