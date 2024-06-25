import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ServerResponse } from 'http'
import { AppModule } from './app.module'

function setupCors(app: INestApplication) {
	app.enableCors()
}

function setupGlobalValidation(app: INestApplication) {
	app.useGlobalPipes(new ValidationPipe({ transform: true }))
}

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Swagger APIs')
		.setDescription('The Swagger APIs description')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	app.use('/api-doc', (_, res: ServerResponse) =>
		res.end(JSON.stringify(document)),
	)

	return document
}

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)

	setupSwagger(app)
	setupGlobalValidation(app)
	setupCors(app)
	await app.listen(8000)
}

bootstrap()
