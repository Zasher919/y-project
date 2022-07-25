import { Controller, Get } from '@nestjs/common';

@Controller('api/h5/address')
export class AddressController {
    @Get()
    test(){
        return 'tset'
    }
}
