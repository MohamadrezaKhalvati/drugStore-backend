import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
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
			email: user.email.toLowerCase(),
		}

		const token = await this.signPayload(payload)

		return { token }
	}

	private verifyPasswordEqualToConfirmPassword(
		password: string,
		confirmPassword: string,
	) {
		if (password !== confirmPassword) {
			throw new Error('Password and Confirm Password do not match')
		}
	}

	async verifyUserForLogin(input: LoginInput) {
		const { email, password } = input
		
		if (!user) {
			throw new NotFoundException('User with this email does not exist')
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) throw new NotFoundException('password is not correct')
		return user
	}

	private signPayload(input: PayloadType) {
		return this.jwt.sign(input)
	}

	async createHashedPassword(mainPassword: string) {
		const saltOrRounds = 10
		const hash = await bcrypt.hash(mainPassword, saltOrRounds)
		return hash
	}
}
type PayloadType = {
	id: string
	username: string
	email: string
	role: string
}
