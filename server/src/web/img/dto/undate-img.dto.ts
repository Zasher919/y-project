import { IsString, IsNumber, Min, IsOptional, IsNumberString, IsIn } from 'class-validator'
// import { $enum } from 'ts-enum-util'

// import { StatusValue } from '../../../common/enums/common.enum'

export class UpdateImgDto {
  @IsNumberString({}, { message: 'id 类型错误，正确类型 string' })
  id: string

  @IsString({ message: 'imgName 类型错误, 正确类型 string' })
  imgName?: string

  @IsString({ message: 'imgType 类型错误, 正确类型 string' })
  imgType?: string

  @IsString({ message: 'imgType 类型错误, 正确类型 string' })
  imgUrl?: string

  //   @CreateDateColumn({ type: 'timestamp', name: 'create_date', comment: '创建时间' })
  createDate?: any

  //   @CreateDateColumn({ type: 'timestamp', name: 'create_date', comment: '创建时间' })
  updateDate?: any
}
