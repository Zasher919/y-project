import { Body, Controller, Post, Req, UseGuards, Get, Delete, Param, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiExtraModels } from '@nestjs/swagger'

import { ResultData } from 'src/libs/result'
// import { AllowAnon } from '../../common/decorators/allow-anon.decorator'
// import { ApiResult } from '../../common/decorators/api-result.decorator'

// import { UserH5Service } from './h5-user.service'
import { H5UserService } from './h5-user.service'
import { H5UserEntity } from './h5-user.entity'

import { LoginUser } from './dto/login-user.dto'
// import { CreateUserDto } from './dto/create-user.dto'
// import { CreateTokenDto } from './dto/create-token.dto'
// import { CreateUserH5Dto } from './dto/create-h5-user.dto'
import { CreateH5UserDto } from './dto/create-h5-user.dto'

import { FindUserListDto } from './dto/find-user-list.dto'

@ApiTags('h5登录注册')
@ApiExtraModels(ResultData, H5UserEntity)
@Controller('api/h5')
export class H5UserController {
  constructor(
    // private readonly userService: UserService,
    private readonly H5UserService: H5UserService,
  ) {}

  // @Post('register')
  // @ApiOperation({ summary: '用户注册' })
  // @ApiResult(UserEntity)
  // @AllowAnon()
  // async create(@Body() user: CreateUserDto): Promise<ResultData> {
  //   return await this.userService.create(user)
  // }

  @Post('register')
  @ApiOperation({ summary: 'h5用户注册' })
  // @ApiResult(H5UserEntity)
  // @AllowAnon()
  async createH5(@Body() user: CreateH5UserDto): Promise<ResultData> {
    console.log('user', user)
    return await this.H5UserService.create(user)
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  // @ApiResult(CreateTokenDto)
  // @AllowAnon()
  async login(@Body() dto: LoginUser): Promise<ResultData> {
    console.log('dto-', dto)

    return await this.H5UserService.login(dto.phoneNum)
  }

  @Get('list')
  // @ApiOperation({ summary: '登录' })
  // @ApiResult(CreateTokenDto)
  // @AllowAnon()
  async allUser(@Query() search: CreateH5UserDto): Promise<ResultData> {
    return await this.H5UserService.findAllUser(search)
  }

  @Get('user')
  // @ApiOperation({ summary: '登录' })
  // @ApiResult(CreateTokenDto)
  // @AllowAnon()
  async findUser(@Query() search: CreateH5UserDto): Promise<ResultData> {
    return await this.H5UserService.findUser(search)
  }

  // @Post('/update/token')
  // @ApiOperation({ summary: '刷新token'})
  // @ApiResult(CreateTokenDto)
  // @ApiBearerAuth()
  // async updateToken (@Req() req): Promise<ResultData> {
  //   return await this.userService.updateToken(req.user.id)
  // }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResultData> {
    return this.H5UserService.delete(id)
  }
}
