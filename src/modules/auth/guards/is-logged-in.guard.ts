import {
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common'
import { TokenGuardData } from './token.guard'

export class IsLoggedIn implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()

		const tokenData: TokenGuardData = request.headers._tokenGuard
		let result = false
		if (tokenData.user) {
			result = true
		} else {
			if (tokenData.tokenError) {
				throw new UnauthorizedException('Not Authorized')
			}
		}

		return result
	}
}
