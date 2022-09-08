import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, getManager, In } from 'typeorm'

import { H5OperateEntity } from './h5-operate.entity'

import { ResultData } from 'src/libs/result'

import { CreateH5OperateDto } from './dto/create-h5-operate.dto'

import { ProductsService } from 'src/web/products/product.service'

@Injectable()
export class H5OperateService {
  constructor(
    @InjectRepository(H5OperateEntity)
    private readonly H5OperateEntity: Repository<H5OperateEntity>,
    private readonly ProductsService: ProductsService,
  ) {}

  /** 新增购物车 */
  async create(dto: CreateH5OperateDto): Promise<ResultData> {
    if (!dto.productId) return ResultData.fail(4002, 'err', '添加失败')
    // 防止重复创建 start
    const isHas = await this.H5OperateEntity.findOne({ productId: dto.productId })
    if (isHas) return ResultData.fail(4001, 'err', '已添加到购物车')

    const result = this.H5OperateEntity.save(dto)
    return ResultData.ok(result)
  }

  /* 新增用户收藏 */
  async collect(dto: any): Promise<ResultData> {
    const isHas = await this.H5OperateEntity.findOne({ productId: dto.productId, userId: dto.userId })
    let result
    if (isHas) {
      result = await this.H5OperateEntity.update(isHas.id, dto)
    } else {
      result = await this.H5OperateEntity.save(dto)
    }
    return ResultData.ok(result)
  }

  async findCart(search: CreateH5OperateDto): Promise<ResultData> {
    if (search.userId) {
      const result = await this.H5OperateEntity.find({ userId: search.userId })
      const ids = result.map((v) => v.productId)
      const datas = await this.ProductsService.findOneByIds(ids)
      return ResultData.ok(datas)
    }

    const result = await this.H5OperateEntity.find()

    return ResultData.ok(result)
  }

  async getCollect(search: CreateH5OperateDto): Promise<ResultData> {
    if (search.userId) {
      const result = await this.H5OperateEntity.find({ userId: search.userId })
      // result = result.filter((v) => v.isCollect != '0')
      console.log(result, 'result')

      return ResultData.ok(result)
    }

    const result = await this.H5OperateEntity.find()

    return ResultData.ok(result)
  }

  async delete(search: any): Promise<ResultData> {
    console.log(search.ids.split(','), 'search')

    const result = await this.H5OperateEntity.delete(search.ids.split(','))

    return ResultData.ok()
  }

  // /**
  //  * 登录
  //  * account 有可能是 帐号/手机/邮箱
  //  */
  // async login(phoneNum: string): Promise<ResultData> {
  //   let user = null
  //   // if (validPhone(account)) {
  //   //   // 手机登录
  //   //   console.log('account', account)
  //   //   user = await this.h5UserRepo.findOne({ phoneNum: account })
  //   // }
  //   console.log('account', phoneNum)
  //   user = await this.h5UserRepo.findOne({ phoneNum: phoneNum })
  //   const payload = {
  //     userId: user['id'],
  //     phoneNum: user.phoneNum,
  //   }
  //   console.log('user', user)
  //   // else if (validEmail(account)) { // 邮箱
  //   //   user = await this.userRepo.findOne({ email: account })
  //   // }
  //   //  else { // 帐号
  //   //   user = await this.findOneByAccount(account)
  //   // }
  //   if (user == null) return ResultData.fail(400, '帐号或密码错误')
  //   // const checkPassword = await compare(password, user.password)
  //   // if (!checkPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号或密码错误')
  //   // if (user.status === 0) return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '您已被禁用，如需正常使用请联系管理员')
  //   // 生成 token
  //   // const data = this.genToken({ id: user.id })
  //   return ResultData.ok({ access_token: this.jwtService.sign(payload) })
  // }

  // async delete(id: string): Promise<ResultData> {
  //   let result = await this.h5UserRepo.findOne(id)
  //   // const existing = await this.deptRepo.findOne(id)
  //   if (!result) return ResultData.fail(500, '用户不存在或已被删除')
  //   const { affected } = await getManager().transaction(async (transactionalEntityManager) => {
  //     await transactionalEntityManager.delete<H5UserEntity>(H5UserEntity, { id: id })
  //     return await transactionalEntityManager.delete<H5UserEntity>(H5UserEntity, id)
  //   })
  //   return ResultData.ok()
  // }

  // /**
  //  * 生成 token 与 刷新 token
  //  * @param payload
  //  * @returns
  //  */
  // // genToken(payload: { id: string }): CreateTokenDto {
  // //   const accessToken = `Bearer ${this.jwtService.sign(payload)}`
  // //   const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('jwt.refreshExpiresIn') })
  // //   return { accessToken, refreshToken }
  // // }
}
