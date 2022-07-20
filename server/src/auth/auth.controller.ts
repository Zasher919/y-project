import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuardUser } from './guards/local-auth.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Log } from 'src/libs/utils'

import { LoginUserDto } from './dto/login-user.dto'

@ApiTags('user auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuardUser)
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Request() req) {
    console.log('user auth admin', req.user)
    Log({ req, user: req.user })
    return this.authService.login(req.user)
  }
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   console.log('loginUserDto', loginUserDto)

  //   Log({ loginUserDto, user: loginUserDto })
  //   return this.authService.login(loginUserDto)
  // }

  @Post('h5/login')
  @ApiOperation({ summary: '用户登录' })
  async h5Login(@Request() req) {
    console.log('user auth h5', req.user)
    Log({ req, user: req.user })
    return this.authService.h5Login(req.user)
  }

  @Post('logout')
  @ApiOperation({ summary: '用户登出' })
  async logout() {
    return this.authService.logout()
  }
}
