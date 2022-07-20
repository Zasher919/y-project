import { Body, Controller, Post, Req, UseGuards, Get, Delete, Param, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiExtraModels } from '@nestjs/swagger'

import { ResultData } from 'src/libs/result'

import { H5OperateService } from './h5-operate.service'
import { H5OperateEntity } from './h5-operate.entity'

// import { LoginUser } from './dto/login-user.dto'

import { CreateH5OperateDto } from './dto/create-h5-operate.dto'

import { FindOperateListDto } from './dto/find-h5-operate.dto'

@ApiTags('h5登录注册')
@ApiExtraModels(ResultData, H5OperateEntity)
@Controller('api/h5/cart')
export class H5OperateController {
  constructor(
    // private readonly userService: UserService,
    private readonly H5OperateService: H5OperateService,
  ) {}

  @Post('add')
  @ApiOperation({ summary: '新增购物车' })
  // @ApiResult(UserEntity)
  // @AllowAnon()
  async create(@Body() user: CreateH5OperateDto): Promise<ResultData> {
    console.log(user, 'user')

    return await this.H5OperateService.create(user)
  }

  // 新增收藏
  @Post('collect')
  @ApiOperation({ summary: '新增购物车' })
  // @ApiResult(UserEntity)
  // @AllowAnon()
  async collect(@Body() user: any): Promise<ResultData> {
    console.log(user, 'user')

    return await this.H5OperateService.collect(user)
  }

  @Get()
  @ApiOperation({ summary: '查询购物车' })
  // @ApiResult(CreateTokenDto)
  // @AllowAnon()
  async getuesr(@Query() search: CreateH5OperateDto): Promise<ResultData> {
    return await this.H5OperateService.findCart(search)
  }

  @Get('collect')
  @ApiOperation({ summary: '查询收藏' })
  // @ApiResult(CreateTokenDto)
  // @AllowAnon()
  async getCollect(@Query() search: any): Promise<ResultData> {
    return await this.H5OperateService.getCollect(search)
  }

  @Get('del')
  @ApiOperation({ summary: '查询购物车' })
  // @ApiResult(CreateTokenDto)
  // @AllowAnon()
  async delete(@Query() search: any): Promise<ResultData> {
    return await this.H5OperateService.delete(search)
    console.log(search, 'search')
    // return  ResultData.ok('ok')
  }

  // @Post('register')
  // @ApiOperation({ summary: 'h5用户注册' })
  // // @ApiResult(H5UserEntity)
  // // @AllowAnon()
  // async createH5(@Body() user: CreateH5UserDto): Promise<ResultData> {
  //   console.log('user', user)
  //   return await this.H5UserService.create(user)
  // }

  // @Post('login')
  // @ApiOperation({ summary: '登录' })
  // // @ApiResult(CreateTokenDto)
  // // @AllowAnon()
  // async login(@Body() dto: LoginUser): Promise<ResultData> {
  //   console.log('dto-', dto)

  //   return await this.H5UserService.login(dto.phoneNum)
  // }

  // @Post('/update/token')
  // @ApiOperation({ summary: '刷新token'})
  // @ApiResult(CreateTokenDto)
  // @ApiBearerAuth()
  // async updateToken (@Req() req): Promise<ResultData> {
  //   return await this.userService.updateToken(req.user.id)
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<ResultData> {
  //   return this.H5UserService.delete(id)
  // }
}
