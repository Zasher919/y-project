import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { H5OperateEntity } from './h5-operate.entity'
import { H5OperateService } from './h5-operate.service'
import { H5OperateController } from './h5-operate.controller'

@Module({
  imports: [TypeOrmModule.forFeature([H5OperateEntity])],
  providers: [H5OperateService],
  controllers: [H5OperateController],
  exports: [],
})
export class H5OperateModule {}
