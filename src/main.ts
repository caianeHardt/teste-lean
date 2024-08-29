import * as helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter({ connectionTimeout: 21000 })
  );
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data', 'validator.swagger.io'	],
        scriptSrc: [`'self'`, `https:'unsafe-inline'`],
      },
    }
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true}));

  const options = new DocumentBuilder()
    .setTitle('Lean StartUp Fintech Documentation')
    .setDescription('Startup API')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  const config = app.get(ConfigService);
  const prefix = config.get('pathPrefix');
  const port = config.get('app.port');
  const bind = config.get('bind');
  await app.listen(3000);
}
bootstrap();
