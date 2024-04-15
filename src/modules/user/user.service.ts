import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { UpdateUserInput } from './dto/update-user.input'
@Injectable()
export class UserService {
	readonlySelectUser = {
		id: true,
		username: true,
		email: true,
		role: true,
	}

	constructor(private prisma: PrismaService) {}

	async me() {}

	async createUser(input: CreateUserInput) {
		const { data } = input
		await this.checkUniqueUsername(data.username)
		await this.checkUniqueEmail(data.email)

		const user = await this.prisma.user.create({
			data: {
				email: data.email,
				password: data.hashedPassword,
				username: data.username,
				role: data.role,
			},
			select: this.readonlySelectUser,
		})
		return user
	}

	async checkUniqueUsername(username: string) {
		const user = await this.prisma.user.findUnique({
			where: { username },
		})
		if (user) {
			//TODO :  error handling in checkUniqueUsername
			console.log('This username is in the database')
		}
		return user
	}

	async checkUniqueEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
		})
		if (user) {
			//TODO :  error handling in checkUniqueUsername
			console.log('This email is in the database')
		}
		return user // Return true if email is unique, false otherwise
	}
	async readUser() {}

	async updateUser(input: UpdateUserInput) {}

	async deleteUser(input: DeleteUserInput) {
		const {
			data: { id },
		} = input

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
			//TODO : error handling in verifyIfUserExistance
			console.log('error in verifyIfUserExistance')
		}
		return user
	}
}
