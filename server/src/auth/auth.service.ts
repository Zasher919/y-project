import { Injectable } from '@nestjs/common'
import { cryptoString } from '../libs/lib'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../web/users/users.service'
// import { H5UserService } from '../h5users/h5-user.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('auth service validateUser', username, password)
    const data = await this.usersService.findOneByName(username)

    console.log('auth service validateUser data', data)

    const user = JSON.parse(JSON.stringify(data || {}))

    password = cryptoString(password)

    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  // 登录
  async login(user: any) {
    console.log('login  xxxxxx', user)
    const payload = {
      username: user.name,
      userId: user['id'],
      roles: user.roles,
      status: user.status,
      department: user.department,
      phone: user.phone,
      avatar: user.avatar,
      departmentName: user.departmentName,
      departmentId: user.departmentId,
      areaId: user.areaId,
    }
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '10m' }),
    }
  }

  // 登录
  async h5Login(user: any) {
    console.log('login  xxxxxx', user)
    const payload = {
      username: user.name,
      userId: user['id'],
      roles: user.roles,
      status: user.status,
      department: user.department,
      phone: user.phone,
      avatar: user.avatar,
      departmentName: user.departmentName,
      departmentId: user.departmentId,
      areaId: user.areaId,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  // 登出
  async logout() {
    return {
      message: 'ok',
    }
  }
}
