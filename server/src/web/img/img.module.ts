import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ImgEntity } from './img.entity'

import { ImgController } from './img.controller'
import { ImgService } from './img.service'

@Module({
  imports: [TypeOrmModule.forFeature([ImgEntity])],
  providers: [ImgService],
  controllers: [ImgController],
  exports: [],
})
export class ImgModule {}
