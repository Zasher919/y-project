import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getManager } from 'typeorm'
import { ImgEntity } from './img.entity'

import { ResultData } from 'src/libs/result'
// import { plainToInstance } from 'class-transformer'
// import { AppHttpCode } from 'src/common/enums/code.enum'

import { CreateImgDto } from './dto/create-img.dto'
import { UpdateImgDto } from './dto/undate-img.dto'
import { FindImgDto } from './dto/find-img.dto'

@Injectable()
export class ImgService {
  constructor(
    @InjectRepository(ImgEntity)
    private readonly imgRepo: Repository<ImgEntity>,
  ) {}

  //   ** 创建部门 */
  async create(createDto: CreateImgDto): Promise<ResultData> {
    createDto.createDate = createDto.updateDate = +new Date()

    const res = this.imgRepo.save(createDto)

    return ResultData.ok(res)
    // 查询父部门是否存在
    // if (dto.id) {
    //   const existing = await this.imgRepo.findOne(dto.id)
    //   if (existing) return ResultData.fail(AppHttpCode.DEPT_NOT_FOUND, '上级部门不存在或已被删除，请修改后重新添加')
    // }
    // let timestamp = Date.parse(new Date().toString())
    // const img = plainToInstance(ImgEntity, dto)

    // const res = await getManager().transaction(async (transactionalEntityManager) => {
    //   return await transactionalEntityManager.save<ImgEntity>(img)
    // })
    // if (!res) ResultData.fail(AppHttpCode.SERVICE_ERROR, '创建失败，请稍后重试')
    // return ResultData.ok(res)
  }

  /** 更新图片 */
  async update(updateDto: UpdateImgDto): Promise<ResultData> {
    // const existing = await this.imgRepo.findOne(dto.id)

    updateDto.updateDate = +new Date()
    const res = this.imgRepo.update(updateDto.id, updateDto)
    // if (!existing) return ResultData.fail(AppHttpCode.DEPT_NOT_FOUND, '部门不存在或已被删除，请修改后重新添加')
    // const { affected } = await getManager().transaction(async (transactionalEntityManager) => {
    //   return await transactionalEntityManager.update<ImgEntity>(ImgEntity, dto.id, dto)
    // })
    // if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '更新失败，请稍后尝试')
    return ResultData.ok(res)
  }

  /** 删除图片 */
  async delete(id: string): Promise<ResultData> {
    const existing = await this.imgRepo.findOne(id)
    if (!existing) return ResultData.fail(500, '图片不存在或已被删除')
    // updateDto.updateDate = +new Date()
    const res = this.imgRepo.delete(id)

    // const { affected } = await getManager().transaction(async (transactionalEntityManager) => {
    //   await transactionalEntityManager.delete<ImgEntity>(ImgEntity, { parentId: id })
    //   return await transactionalEntityManager.delete<ImgEntity>(ImgEntity, id)
    // })
    // if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '删除部门失败，请稍后尝试')
    return ResultData.ok()
  }

  /** 查询图片 */
  async find(search: FindImgDto): Promise<ResultData> {
    console.log(search, 'search')
    let { imgType } = search
    if (imgType == null) {
      const imgs = await this.imgRepo.find()
      return ResultData.ok(imgs)
    }

    const imgs = await this.imgRepo.findAndCount({ imgType })
    return ResultData.ok(imgs)
  }

  /** 查询分类图片 */
  async findImgType(type: string): Promise<ResultData> {
    // console.log(search, 'search')
    // let { imgType } = search
    const imgs = await this.imgRepo.findAndCount({ imgType: type })
    return ResultData.ok(imgs)
  }
}
