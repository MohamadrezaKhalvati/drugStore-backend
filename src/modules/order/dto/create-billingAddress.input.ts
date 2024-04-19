import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, ValidateNested } from 'class-validator'

export class CreateBillingAddressData {
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

export class CreateBillingAddressInput {
	@ApiProperty()
	@IsString()
	@ValidateNested()
	data: CreateBillingAddressData
}
