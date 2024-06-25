import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma, Role } from '@prisma/client'
import cleanDeep from 'clean-deep'
import { PrismaService } from '../prisma/prisma.service'
import { createPaginationResult } from './../../common/pagination.input'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { ReadUserInput } from './dto/read-user.input'
import { UpdateUserInput } from './dto/update-user.input'
@Injectable()
export class UserService {
	readonlySelectUser = {
		id: true,
		username: true,
		name: true,
		email: true,
		role: true,
		phoneNumber: true,
	}

	constructor(private prisma: PrismaService) {}

	async me() {}

	async createUser(input: CreateUserInput) {
		const { email, username } = input
		await this.checkUniqueUsername(username)
		await this.checkUniqueEmail(email)

		const user = await this.prisma.user.create({
			data: {
				email: input.email.toLowerCase(),
				password: input.password,
				username: input.username.toLowerCase(),
				role: input.role,
				name: input.name,
				phoneNumber: input.phoneNumber,
			},
			select: this.readonlySelectUser,
		})
		return user
	}

	verify

	async checkUniqueUsername(username: string) {
		const user = await this.prisma.user.findUnique({
			where: { username },
		})
		if (user) {
			throw new BadRequestException('Username is already exist')
		}
		return user
	}

	async checkUniqueEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
		})
		if (user) {
			throw new BadRequestException('Email is already exist')
		}
		return user
	}

	async readUser(input: ReadUserInput) {
		const rawWhere = input.data || {}

		let whereClause: Prisma.UserWhereInput = {
			id: rawWhere.id,
			isActive: rawWhere.isActive,
			name: { mode: 'insensitive', contains: rawWhere.name },
			role: rawWhere.role,
			username: rawWhere.username,
			email: rawWhere.email,
			createDate: rawWhere.createDate,
			updateDate: rawWhere.updateDate,
			password: rawWhere.password,
		}

		whereClause = cleanDeep(whereClause)

		const count = this.prisma.user.count({ where: whereClause })
		const entity = this.prisma.user.findMany({
			where: whereClause,
			...input?.sortyBy?.convertToPrismaFilter(),
			...input?.pagination?.convertToPrismaFilter(),
		})
		return await createPaginationResult({ count, entity })
	}

	async updateUser(input: UpdateUserInput, requesterId: string) {
		const { data, id } = input
		await this.verifyIfUserExistance(id)

		let myUserName = data.username
		let myEmail = data.email
		let myPhoneNumber = data.phoneNumber
		const myName = data.name
		const myIsActive = data.isActive

		if (!!data.username) {
			myUserName = await this.verifyIsUsernameNotDuplicate(
				id,
				data.username.toLowerCase(),
			)
		}
		if (!!data.email) {
			myEmail = await this.verifyIsEmailIsNotDuplicate(id, data.email)
		}

		if (!!data.phoneNumber) {
			myPhoneNumber = await this.verifyIsPhoneNumberNotDuplicate(
				data.phoneNumber,
				requesterId,
			)
		}

		if (!!data.role || !!data.isActive) {
			await this.verifyAdminUser(requesterId)
		}

		let dataClause: Prisma.UserUpdateInput = {
			email: myEmail,
			username: myUserName,
			role: data.role,
			isActive: myIsActive,
			name: myName,
			phoneNumber: data.phoneNumber,
		}

		dataClause = cleanDeep(dataClause)

		const user = await this.prisma.user.update({
			where: {
				id: id,
			},
			data: dataClause,
		})
		return user
	}

	private async verifyAdminUser(requesterId: string) {
		const foundUser = await this.prisma.user.findFirst({
			where: {
				id: requesterId,
				role: Role.Administrator,
			},
		})

		if (!foundUser)
			throw new ForbiddenException(
				'Access denied: Administrator role required',
			)
	}

	private async verifyIsPhoneNumberNotDuplicate(
		phoneNumber: string,
		requesterId: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { phoneNumber: phoneNumber },
		})
		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				phoneNumber = null
				return phoneNumber
			} else {
				throw new ConflictException(
					'The phone number is already in use',
				)
			}
		} else if (duplicateUser.length > 1) {
			throw new ConflictException(
				'Multiple users found with the same phone number',
			)
		}

		return phoneNumber
	}
	private async verifyIsEmailIsNotDuplicate(
		requesterId: string,
		email: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { email: email },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				email = null
				return email
			} else {
				throw new ConflictException(
					'The email address is already in use',
				)
			}
		} else if (duplicateUser.length > 1) {
			throw new ConflictException(
				'Multiple users found with the same email address',
			)
		}

		return email.toLowerCase()
	}

	async verifyIfNewUserIsNotDuplicate(username: string, email: string) {
		if (username) {
			const duplicateUsername = await this.prisma.user.findUnique({
				where: { username },
			})
			if (duplicateUsername) {
				throw new ConflictException('The username is already in use')
			}
		}
		if (email) {
			const duplicateEmail = await this.prisma.user.findUnique({
				where: { email },
			})
			if (duplicateEmail) {
				throw new ConflictException(
					'The email address is already in use',
				)
			}
		}
	}

	private async verifyIsUsernameNotDuplicate(
		requesterId: string,
		username: string,
	) {
		const duplicateUser = await this.prisma.user.findMany({
			where: { username },
		})

		if (duplicateUser.length == 1) {
			if (duplicateUser[0].id == requesterId) {
				username = null
				return username
			} else {
				throw new ConflictException('The username is already in use')
			}
		} else if (duplicateUser.length > 1) {
			throw new ConflictException(
				'Multiple users found with the same username',
			)
		}
		return username.toLowerCase()
	}

	async deleteUser(input: DeleteUserInput) {
		const { id } = input

		const user = await this.verifyIfUserExistance(id)
		const deletedUser = await this.prisma.user.update({
			where: { id },
			data: {
				isActive: false,
			},
		})

		return deletedUser
	}

	async verifyIfUserExistance(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: this.readonlySelectUser,
		})
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}
		return user
	}
}
