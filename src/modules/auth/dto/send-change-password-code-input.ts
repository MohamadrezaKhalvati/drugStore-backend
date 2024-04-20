import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber } from 'class-validator'

export class SendChangePasswordCodeInput {
	@ApiProperty()
	@IsPhoneNumber('IR')
	phoneNumber: number
}
