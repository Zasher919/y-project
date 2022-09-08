import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
@Entity('mobile_order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @Column()
  phoneNum: string

  @Column()
  addressId: string

  @Column()
  price: string

  @Column()
  remarks: string

  @Column()
  orderStatus: string

  @Column()
  createDate: Date
}
