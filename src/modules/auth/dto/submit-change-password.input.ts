import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

class SubmitChangePasswordData {
	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	confirmPassword: string
}

export class SubmitChangePasswordInput {
	@ApiProperty({ type: SubmitChangePasswordData })
	@Type(() => SubmitChangePasswordData)
	@ValidateNested()
	data: SubmitChangePasswordData
}
