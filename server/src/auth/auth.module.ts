import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { jwtConstants } from '../libs/lib'
import { JwtStrategyUser } from './strategies/jwt.strategy'
import { LocalStrategyUser } from './strategies/local.strategy'
import { AuthController } from './auth.controller'
import { UsersModule } from '../web/users/users.module'

// import { H5UserModule } from 'src/h5users/h5-user.module'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'userjwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategyUser, JwtStrategyUser],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
