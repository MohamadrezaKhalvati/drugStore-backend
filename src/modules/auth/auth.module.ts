import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '../prisma/prisma.module'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TokenGuard } from './guards/token.guard'

@Module({
  providers: [
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_TOKEN,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_DATE },
    }),
  ],
})
export class AuthModule {}
