// import { $enum } from 'ts-enum-util'
// import { StatusValue } from 'src/common/enums/common.enum'

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 50, comment: '产品名称' })
  productName: string

  @Column({ type: 'varchar', length: 50, comment: '产品标题' })
  productTitle: string

  @Column({ type: 'varchar', length: 500, comment: '产品图片' })
  productCoverImg: string

  @Column({ type: 'varchar', length: 500, comment: '产品价格' })
  productPrice: string

  @Column({ type: 'varchar', length: 500, comment: '产品位置' })
  productPosition: string

  @Column({ type: 'varchar', length: 500, comment: '产品标签' })
  productTag: string

  @Column({ type: 'varchar', length: 500, comment: '配送方式' })
  expressage: string

  @Column({ type: 'varchar', length: 500, comment: '产品描述' })
  productDescribe: string

  @Column({ type: 'varchar', length: 50, comment: '产品参数' })
  productParameter: string

  @Column({ type: 'varchar', length: 500, comment: '售后服务' })
  afterSaleServe: string

  @Column({ type: 'varchar', length: 500, comment: '产品详情内容' })
  productDetailContent: string

  @Column({ type: 'varchar', comment: '创建时间' })
  createDate?: any

  @Column({ type: 'varchar', comment: '创建时间' })
  updateDate?: any
}
