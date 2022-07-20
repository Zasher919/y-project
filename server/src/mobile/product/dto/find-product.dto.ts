// import { ReqListQuery } from '../../../common/utils/req-list-query'
import { IsString } from 'class-validator'

export class FindProductDto {
  productName?: string

  // @IsString({ message: 'productTitle 类型错误, 正确类型 string' })
  productTitle?: string

  // @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productPrice?: string

  // @IsString({ message: 'productTag 类型错误, 正确类型 string' })
  productTag?: string

  // @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productPosition?: string
}
