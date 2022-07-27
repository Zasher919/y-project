import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from 'src/libs/result'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly AddressRepo: Repository<OrderEntity>
    ){}
    
    /** 创建地址 */
  async create(dto: CreateOrderDto): Promise<ResultData> {
    // const finds =await this.AddressRepo.find({id:dto.id})
    
    if(false){
        return ResultData.fail(407,'默认地址只能选择一个')
    }else{
        dto['createDate'] = new Date()
        const result = await this.AddressRepo.save(dto)
        return ResultData.ok()
        
    }

    
  }

  /** 更新地址 */
  async update(dto:any): Promise<ResultData> {
    const result =await this.AddressRepo.update(dto.id,dto)
    return ResultData.ok(result)
  }
  
  /** 删除地址 */
  async delete(id:string): Promise<ResultData> {
    let finddata = await this.AddressRepo.findOne(id)
    if(!finddata) return ResultData.fail(401,"地址不存在")
    const result = await this.AddressRepo.delete(id)
    return ResultData.ok()
  }

  /** 查询地址 */
  async find(user:any): Promise<ResultData> {
    const result =await this.AddressRepo.find(user)
    return ResultData.ok(result)
  }
}
