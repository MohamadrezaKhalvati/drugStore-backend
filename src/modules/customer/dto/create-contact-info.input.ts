import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsPhoneNumber, IsString } from 'class-validator'

export class CreateContactInput {
	@ApiProperty()
	@IsPhoneNumber('IR')
	@IsNumber()
	phoneNumber: number

	@ApiProperty()
	@IsString()
	email: string
}
