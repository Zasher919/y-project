import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getManager } from 'typeorm'

import { ResultData } from 'src/libs/result'
// import { plainToInstance } from 'class-transformer'
// import { AppHttpCode } from 'src/common/enums/code.enum'

import { ProductEntity } from './product.entity'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FindProductDto } from './dto/find-product.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  //   ** 创建部门 */
  async create(createDto: CreateProductDto): Promise<any> {
    createDto.createDate = createDto.updateDate = +new Date()

    const res = await this.productRepo.save(createDto)

    return ResultData.ok(res)

    // return res
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
  async update(updateDto: UpdateProductDto): Promise<any> {
    // const existing = await this.imgRepo.findOne(dto.id)
    console.log(updateDto, 'updateDto')

    updateDto.updateDate = +new Date()
    const res = await this.productRepo.update(updateDto.id, updateDto)
    // if (!existing) return ResultData.fail(AppHttpCode.DEPT_NOT_FOUND, '部门不存在或已被删除，请修改后重新添加')
    // const { affected } = await getManager().transaction(async (transactionalEntityManager) => {
    //   return await transactionalEntityManager.update<ImgEntity>(ImgEntity, dto.id, dto)
    // })
    // if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '更新失败，请稍后尝试')
    return res
  }

  /** 删除图片 */
  async delete(id: string): Promise<any> {
    const existing = await this.productRepo.findOne(id)
    // if (!existing) return ResultData.fail('404', '图片不存在或已被删除')
    // updateDto.updateDate = +new Date()
    const res = await this.productRepo.delete(id)

    // const { affected } = await getManager().transaction(async (transactionalEntityManager) => {
    //   await transactionalEntityManager.delete<ImgEntity>(ImgEntity, { parentId: id })
    //   return await transactionalEntityManager.delete<ImgEntity>(ImgEntity, id)
    // })
    // if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '删除部门失败，请稍后尝试')
    // return ResultData.ok()
    return res
  }

  /** 查询图片 */
  async find(search: FindProductDto): Promise<any> {
    console.log('success')

    const res = await this.productRepo.find()
    // return ResultData.ok(res)
    return res
  }

  /** 查询图片 */
  async findOne(id: string): Promise<any> {
    const res = await this.productRepo.findOne(id)
    // return ResultData.ok(res)
    return res
  }

  async findH5All(): Promise<any> {
    console.log('success-ress')

    const list = {
      newProductList: [],
      hotProductList: [],
      recommendProductList: [],
    }
    const imgs = await this.productRepo.find()

    imgs.forEach((item) => {
      if (item.productPosition == '1') {
        list.newProductList.push(item)
      }
      if (item.productPosition == '2') {
        list.hotProductList.push(item)
      }
      if (item.productPosition == '3') {
        list.recommendProductList.push(item)
      }
    })

    return ResultData.ok(list)
    // return list
  }
  /** 查询分类图片 */
  async findImgType(type: string): Promise<any> {
    // console.log(search, 'search')
    // let { imgType } = search
    // const imgs = await this.productRepo.findAndCount({ imgType: type })
    // return ResultData.ok(imgs)
    return ResultData.ok()
    // return 'ok'
  }
}
