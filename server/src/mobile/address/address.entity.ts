
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,  } from 'typeorm'
@Entity('mobile_user_address')
export class AddressEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userID: string

    @Column()
    phoneNume: string

    @Column()
    provinceName:  string

    @Column()
    cityName: string

    @Column()
    regionName: string

    @Column()
    detailAddress: string

    @Column()
    defautlFLag: string

    @Column()
    createDate: string
}