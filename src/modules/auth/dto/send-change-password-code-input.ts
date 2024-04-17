import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsPhoneNumber, ValidateNested } from 'class-validator'

class SendChangePasswordCodeData {
	@ApiProperty()
	@IsPhoneNumber('IR')
	phoneNumber: number
}

export class SendChangePasswordCodeInput {
	@ApiProperty()
	@Type(() => SendChangePasswordCodeData)
	@ValidateNested()
	data: SendChangePasswordCodeData
}
