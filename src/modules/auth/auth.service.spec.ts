import { NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Role } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { SignUpInput } from './dto/signUp.input'

class UserServiceMock {
	async createUser(input: any) {
		return { id: '123', ...input }
	}
}

class PrismaServiceMock {
	async cleanDatabase() {
		const models = Reflect.ownKeys(this).filter(
			key => typeof key === 'string',
		)
		await Promise.all(models.map(modelKey => this[modelKey].deleteMany()))
	}
}

describe('AuthService', () => {
	let authService: AuthService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtService,
				{ provide: PrismaService, useClass: PrismaServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			],
		}).compile()

		authService = module.get<AuthService>(AuthService)
	})

	it('should be defined', () => {
		expect(authService).toBeDefined()
	})

	describe('signUp', () => {
		it('should create a new user', async () => {
			const signUpInput: SignUpInput = {
				email: 'test@example.com',
				username: 'testuser',
				password: 'password123',
				confirmPassword: 'password123',
				phoneNumber: '1234567890',
				role: Role.Administrator,
				name: 'Test User',
			}

			const result = await authService.signUp(signUpInput)
			expect(result).toBeDefined()
			expect(result.email).toBe(signUpInput.email.toLowerCase())
			expect(result.username).toBe(signUpInput.username.toLowerCase())
			expect(result.phoneNumber).toBe(signUpInput.phoneNumber)
			expect(result.role).toBe(signUpInput.role)
			expect(result.name).toBe(signUpInput.name)
		})

		it('should throw error if passwords do not match', async () => {
			const signUpInput: SignUpInput = {
				email: 'test@example.com',
				username: 'testuser',
				password: 'password123',
				confirmPassword: 'password456',
				phoneNumber: '1234567890',
				role: Role.Administrator,
				name: 'Test User',
			}
			await expect(authService.signUp(signUpInput)).rejects.toThrowError(
				'Password and Confirm Password do not match',
			)
		})
	})

	describe('login', () => {
		it('should return a JWT token on successful login', async () => {
			const loginInput: LoginInput = {
				email: 'test@example.com',
				password: 'password123',
			}

			const output = await authService.login(loginInput)

			expect(output.token).toBeDefined()
		})

		it('should throw NotFoundException if password is incorrect', async () => {
			const loginInput: LoginInput = {
				email: 'test@example.com',
				password: 'wrongpassword', // Incorrect password
			}

			await expect(authService.login(loginInput)).rejects.toThrowError(
				NotFoundException,
			)
		})
	})
})
