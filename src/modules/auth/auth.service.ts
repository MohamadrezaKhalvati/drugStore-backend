import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from '../user/dto/create-user.input'
import { UserService } from '../user/user.service'
import { LoginInput } from './dto/login.input'
import { SignUpInput } from './dto/signUp.input'
import { JwtPayloadType } from './guards/token.guard'
@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private userService: UserService,
	) {}

	async signUp(input: SignUpInput) {
		this.verifyPasswordEqualToConfirmPassword(
			input.password,
			input.confirmPassword,
		)

		const hashedPassword = await this.createHashedPassword(input.password)
		const createUserInput: CreateUserInput = {
			email: input.email.toLowerCase(),
			username: input.username.toLowerCase(),
			phoneNumber: input.phoneNumber,
			password: hashedPassword,
			role: input.role,
			name: input.name,
		}
		return await this.userService.createUser(createUserInput)
	}

	async login(input: LoginInput) {
		const user = await this.verifyUserForLogin(input)
		const payload: JwtPayloadType = {
			id: user.id,
			username: user.username.toLowerCase(),
			role: user.role,
		}

		const token = await this.signPayload(payload)

		return { jwt: token }
	}

	private verifyPasswordEqualToConfirmPassword(
		password: string,
		confignPassword: string,
	) {
		password !== confignPassword
			? console.log('error in verifyPasswordEqualToConfirmPassword')
			: true
	}

	async verifyUserForLogin(input: LoginInput) {
		const { username, password } = input
		const hashedPassword = await this.createHashedPassword(password)
		const user = await this.prisma.user.findFirst({
			where: {
				username: username.toLowerCase(),
				password: hashedPassword,
				isActive: true,
			},
		})

		if (!user)
			//TODO : error handling in verifyUserForLogin
			console.log('err')

		return user
	}

	private signPayload(input: PayloadType) {
		return this.jwt.sign(input)
	}

	async createHashedPassword(mainPassword: string) {
		const hashedPassword = await hash(mainPassword, 12)
		return hashedPassword
	}
}
type PayloadType = {
	id: string
	username: string
	role: string
}
