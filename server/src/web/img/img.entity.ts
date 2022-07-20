// import { $enum } from 'ts-enum-util'
// import { StatusValue } from 'src/common/enums/common.enum'

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_img')
export class ImgEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ type: 'varchar', length: 50, comment: '图片名称' })
  imgName: string

  @Column({ type: 'varchar', length: 50, comment: '图片位置' })
  imgType: string

  @Column({ type: 'varchar', length: 500, comment: '图片地址' })
  imgUrl: string

  @Column({ type: 'varchar', comment: '创建时间' })
  createDate?: any

  @Column({ type: 'varchar', comment: '创建时间' })
  updateDate?: any
}
