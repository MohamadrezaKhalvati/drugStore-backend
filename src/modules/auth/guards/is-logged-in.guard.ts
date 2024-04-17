import { CanActivate, ExecutionContext } from '@nestjs/common'
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
				console.log('VerifyToken Error:', tokenData.tokenError)
			}
			// throw Errors.createClientError({
			// 	module: ModuleNames.AuthModule,
			// 	code: 1,
			// })
		}

		return result
	}
}
