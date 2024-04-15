import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

function setupCors(app: INestApplication) {
  app.enableCors()
}

function setupGlobalValidation(app: INestApplication) {
  // app.useGlobalFilters(new CoreExceptionFilter())
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

  return document
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(8000)
}

bootstrap()
