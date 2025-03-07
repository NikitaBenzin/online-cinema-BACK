import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
