import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/modules/prisma/prisma.service'

export type TokenGuardData = {
  user?: {
    id: string
    username: string
    role: 'Admin' | 'Normal' | 'Manager' | 'pharmacists'
  }
  tokenError?: {
    name: string
    message: string
    date?: Date
    expiredAt?: number
  }
}

export type JwtPayloadType = {
  username: string
  id: string
  role: 'Admin' | 'Normal' | 'Manager' | 'pharmacists'
}

export class TokenGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers['authorization'] || ''
    const token = authorization.replace('bearer ', '').replace('jwt ', '')

    try {
      const bodyData: JwtPayloadType = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_TOKEN,
      })
      const tokenData: TokenGuardData = {}
      if (bodyData) {
        const userId = bodyData.id
        const foundUser = await this.prisma.user.findUnique({
          where: { id: userId },
        })

        if (foundUser) {
          tokenData.user = {
            role: foundUser.role,
            id: foundUser.id,
            username: foundUser.username,
          }
        }
        request.headers['_tokenGuard'] = tokenData
      }
    } catch (tokenError) {
      const tokenData: TokenGuardData = { tokenError }
      request.headers['_tokenGuard'] = tokenData
    }

    return true
  }
}
