import { Injectable } from '@nestjs/common'
import { ProductCategoriesService } from '../web/product-categories/product-categories.service'

@Injectable()
export class MobileService {
    constructor(private ProductCategoriesService: ProductCategoriesService) {}
    async loginout(){
        // return {msg:'ok'}
        return await this.ProductCategoriesService.getCount()
    }
}
