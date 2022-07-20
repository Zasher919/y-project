import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { join } from 'path'
import { Log4jsModule } from './libs/log4js/'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'


import { UploadModule } from './upload/upload.module'
import { AuthModule } from './auth/auth.module'


import { CatsModule } from './cats/cats.module'
import { WebModule } from './web/web.module'
import { MobileModule } from './mobile/mobile.module'

const ENV = process.env.NODE_ENV
const dbInfo = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
}
if (ENV === 'prod') {
  dbInfo.host = '10.0.224.4'
  dbInfo.port = 25532 || 3306
  dbInfo.username = 'root'
  dbInfo.password = 'root'
}
const { host, port, username, password } = dbInfo

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database: 'nest_cms_api',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UploadModule,
    AuthModule,
    CatsModule,
    MobileModule,
    WebModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    Log4jsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
