import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { H5UserEntity } from './h5-user.entity'
import { H5UserService } from './h5-user.service'
import { H5UserController } from './h5-user.controller'

import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../libs/lib'

@Module({
  imports: [
    TypeOrmModule.forFeature([H5UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [H5UserService],
  controllers: [H5UserController],
  exports: [],
})
export class H5UserModule {}
