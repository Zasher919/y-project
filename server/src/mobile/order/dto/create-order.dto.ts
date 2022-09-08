import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateOrderDto {
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: 'userid 不能为空' })
  userId: string

  @ApiProperty({ description: '手机号', required: false })
  @IsString({ message: 'phoneNum 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  @IsOptional()
  // @IsPhoneNumber('CH', { message: '请输入正确的手机号' })
  phoneNum: string

  @ApiProperty({ description: '地址id' })
  @IsNotEmpty({ message: 'userName 不能为空' })
  addressId: string

  @ApiProperty({ description: '金额' })
  @IsNotEmpty({ message: 'provinceName 不能为空' })
  price: string

  @ApiProperty({ description: '备注' })
  @IsNotEmpty({ message: 'regionName 不能为空' })
  remarks: string

  @ApiProperty({ description: '订单状态' })
  @IsNotEmpty({ message: 'detailAddress 不能为空' })
  orderStatus: string

  @ApiProperty({ description: '时间' })
  @IsNotEmpty({ message: 'createDate 不能为空' })
  createDate?: Date
}
