import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, getManager, In } from 'typeorm'
// import { instanceToPlain, plainToInstance } from 'class-transformer'
// import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs'

import { H5UserEntity } from './h5-user.entity'

import { ResultData } from 'src/libs/result'

// import { AppHttpCode } from '../../common/enums/code.enum'

import { CreateH5UserDto } from './dto/create-h5-user.dto'

// import { validPhone } from '../../common/utils/validate'

// import { CreateTokenDto } from './dto/create-token.dto'

import { JwtService } from '@nestjs/jwt'

// import { FindUserListDto } from './dto/find-user-list.dto'

@Injectable()
export class H5UserService {
  constructor(
    @InjectRepository(H5UserEntity)
    private readonly h5UserRepo: Repository<H5UserEntity>,
    private jwtService: JwtService,
  ) {}

  /** 创建用户 */
  async create(dto: CreateH5UserDto): Promise<ResultData> {
    // if (dto.password !== dto.confirmPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '两次输入密码不一致，请重试')
    // 防止重复创建 start
    let isHas = await this.h5UserRepo.findOne({ phoneNum: dto.phoneNum })
    if (isHas) return ResultData.fail(4001, 'ok', '账户已存在')

    // if (await this.findOneByAccount(dto.phoneNum)) return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '帐号已存在，请调整后重新注册！')
    // if (await this.userRepo.findOne({ phoneNum: dto.phoneNum })) return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前手机号已存在，请调整后重新注册')
    // if (await this.userRepo.findOne({ email: dto.email })) return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前邮箱已存在，请调整后重新注册')
    // 防止重复创建 end
    // const salt = await genSalt()
    // dto.password = await hash(dto.password, salt)
    // plainToInstance  忽略转换 @Exclude 装饰器
    // const user = plainToInstance(UserH5Entity, { salt, ...dto }, { ignoreDecorators: true })
    // const result = await getManager().transaction(async (transactionalEntityManager) => {
    //   return await transactionalEntityManager.save<H5UserEntity>(user)
    // })

    const result = this.h5UserRepo.save(dto)
    // return ResultData.ok(instanceToPlain(result))
    return ResultData.ok(result)
  }

  /**
   * 登录
   * account 有可能是 帐号/手机/邮箱
   */
  async login(phoneNum: string): Promise<ResultData> {
    let user = null
    // if (validPhone(account)) {
    //   // 手机登录
    //   console.log('account', account)
    //   user = await this.h5UserRepo.findOne({ phoneNum: account })
    // }
    console.log('account', phoneNum)
    user = await this.h5UserRepo.findOne({ phoneNum: phoneNum })
    const payload = {
      userId: user['id'],
      phoneNum: user.phoneNum,
    }
    console.log('user', user)
    // else if (validEmail(account)) { // 邮箱
    //   user = await this.userRepo.findOne({ email: account })
    // }
    //  else { // 帐号
    //   user = await this.findOneByAccount(account)
    // }
    if (user == null) return ResultData.fail(400, '帐号或密码错误')
    // const checkPassword = await compare(password, user.password)
    // if (!checkPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号或密码错误')
    // if (user.status === 0) return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '您已被禁用，如需正常使用请联系管理员')
    // 生成 token
    // const data = this.genToken({ id: user.id })
    return ResultData.ok({ access_token: this.jwtService.sign(payload), userinfo: user })
  }

  async findAllUser(search: CreateH5UserDto): Promise<ResultData> {
    // let user = null

    if (search.phoneNum) {
      let result = await this.h5UserRepo.findOne({ phoneNum: search.phoneNum })
      return ResultData.ok(result)
    }

    let result = await this.h5UserRepo.find()

    return ResultData.ok(result)
  }

  async findUser(search: CreateH5UserDto): Promise<ResultData> {
    if (search.phoneNum) {
      let result = await this.h5UserRepo.findOne({ phoneNum: search.phoneNum })
      return ResultData.ok(result)
    }

    let result = await this.h5UserRepo.find()

    return ResultData.ok(result)
  }

  async delete(id: string): Promise<ResultData> {
    let result = await this.h5UserRepo.findOne(id)
    // const existing = await this.deptRepo.findOne(id)
    if (!result) return ResultData.fail(500, '用户不存在或已被删除')
    const { affected } = await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete<H5UserEntity>(H5UserEntity, { id: id })
      return await transactionalEntityManager.delete<H5UserEntity>(H5UserEntity, id)
    })
    return ResultData.ok()
  }

  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  // genToken(payload: { id: string }): CreateTokenDto {
  //   const accessToken = `Bearer ${this.jwtService.sign(payload)}`
  //   const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('jwt.refreshExpiresIn') })
  //   return { accessToken, refreshToken }
  // }
}
