import { ApiProperty } from '@nestjs/swagger'

export class UserModal {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty()
	username: string

	@ApiProperty()
	email: string

	@ApiProperty()
	password: string

	@ApiProperty()
	isActive: boolean

	@ApiProperty()
	role: Role

	@ApiProperty()
	createDate: Date

	@ApiProperty()
	updateDate: Date
}

enum Role {
	Admin = 'Admin',
	Normal = 'Normal',
	Manager = 'Manager',
	pharmacists = 'pharmacists',
}
