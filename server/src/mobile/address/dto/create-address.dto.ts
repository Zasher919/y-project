import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateAddressrDto {

@ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: 'userid 不能为空' })
  userID: string

  @ApiProperty({ description: '手机号', required: false })
  @IsString({ message: 'phoneNum 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  @IsOptional()
  // @IsPhoneNumber('CH', { message: '请输入正确的手机号' })
  phoneNum: string

  @ApiProperty({ description: '省名' })
  @IsNotEmpty({ message: 'provinceName 不能为空' })
  provinceName:  string

  @ApiProperty({ description: '市名' })
  @IsNotEmpty({ message: 'cityName 不能为空' })
  cityName: string

  @ApiProperty({ description: '区名' })
  @IsNotEmpty({ message: 'regionName 不能为空' })
  regionName: string

  @ApiProperty({ description: '详细地址' })
  @IsNotEmpty({ message: 'detailAddress 不能为空' })
  detailAddress: string

  @ApiProperty({ description: '是否默认' })
  @IsNotEmpty({ message: 'defautlFLag 不能为空' })
  defautlFLag: string

  @ApiProperty({ description: '时间' })
  @IsNotEmpty({ message: 'createDate 不能为空' })
  createDate: string
}
