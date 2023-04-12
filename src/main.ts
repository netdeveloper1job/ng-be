import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { json } from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { basicConfig } from 'src/common/constants/configuration';
const express = require('express');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const config = app.get(ConfigService);
  
  app.enableCors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Accept-Encoding',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    origin: ['http://localhost:4200', 'https://cortex.mspldelhi.co.in','https://cortex.horizon37.co.uk'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Notes')
    .setDescription('The Notes API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Notes')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(express.static('open-certs/issuers'));

  await app.listen(config.get('port'));
  console.log(`Application is running on: http://localhost:${basicConfig.SERVER_PORT}`);
}
bootstrap();
