import { Body, Controller, Delete, Get, Param, Post,Put, Query } from '@nestjs/common';




import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

import { ResultData } from 'src/libs/result'

@Controller('api/h5/oreder')
export class OrederController {
    constructor(
        private readonly OrderService:OrderService,
    ){}
    
    @Post()
    async create(@Body() data:CreateOrderDto): Promise<ResultData>{    
        console.log(data,'data')
        return await this.OrderService.create(data)
    }

    @Put()
    async update(@Body() data:any): Promise<ResultData>{    
        return await this.OrderService.update(data)
    }

    @Delete(':id')
    async delete(@Param('id') id:any): Promise<ResultData>{           
        return await this.OrderService.delete(id)
    }

    @Get()
    async find(@Query() user:any): Promise<ResultData>{         
        return await this.OrderService.find(user)
    }
}
