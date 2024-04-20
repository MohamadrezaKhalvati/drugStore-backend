import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateBillingAddressInput {
	@ApiProperty()
	@IsString()
	street: string

	@ApiProperty()
	@IsString()
	city: string

	@ApiProperty()
	@IsString()
	Province: string

	@ApiProperty({ maxLength: 10, minLength: 10 })
	@IsString()
	@Length(10)
	PostalCode: string

	@ApiProperty()
	@IsString()
	Country: string
}
