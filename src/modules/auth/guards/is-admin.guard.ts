import { CanActivate, ExecutionContext } from '@nestjs/common'
import { TokenGuardData } from './token.guard'

export class IsAdmin implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const tokenData: TokenGuardData = request.headers._tokenGuard
		let result = false

		if (tokenData.user?.role === 'Admin') result = true
		else {
			if (tokenData.tokenError) {
				console.log('VerifyToken Error:', tokenData.tokenError)
			}

			//TODO : ERROR HANDLING

			// throw Errors.createClientError({
			// 	module: ModuleNames.AuthModule,
			// 	code: 2,
			// })
			console.log('asd')
		}

		return result
	}
}
