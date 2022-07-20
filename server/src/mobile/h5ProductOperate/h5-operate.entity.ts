import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('cart')
export class H5OperateEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @Column()
  productId: string

  @Column()                 
  productImg: string

  @Column()
  productName: string

  @Column()
  productPrice: string

  @Column()
  productTag: string

  @Column()
  isCollect: string

  // //   @ApiProperty({ type: Date, description: '创建时间' })
  // @CreateDateColumn({ type: 'timestamp', name: 'create_date', comment: '创建时间' })
  // createDate: Date

  // //   @ApiProperty({ type: Date, description: '更新时间' })
  // @UpdateDateColumn({ type: 'timestamp', name: 'update_date', comment: '更新时间' })
  // updateDate: Date
}
