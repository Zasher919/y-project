import { IsString, IsNumber, Min, IsOptional, IsNumberString, IsIn } from 'class-validator'
// import { $enum } from 'ts-enum-util'
import { CreateDateColumn } from 'typeorm'

// import { StatusValue } from '../../../common/enums/common.enum'

export class CreateProductDto {
  // @IsNumberString({}, { message: 'id 类型错误，正确类型 string' })
  // id: string

  @IsString({ message: 'productName 类型错误, 正确类型 string' })
  productName: string

  @IsString({ message: 'productTitle 类型错误, 正确类型 string' })
  productTitle: string

  @IsString({ message: 'productCoverImg 类型错误, 正确类型 string' })
  productCoverImg: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productPrice: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productPosition: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  expressage: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productDescribe: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productParameter: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  afterSaleServe: string

  @IsString({ message: 'productPrice 类型错误, 正确类型 string' })
  productDetailContent: string

  productTag: string

  createDate?: any

  updateDate?: any
}
