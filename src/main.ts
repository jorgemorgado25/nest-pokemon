import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v2');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

      // Transformar la data de los query parameter, convertir a número si es el caso
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
      
    })
  );

  await app.listen(process.env.PORT);

  console.log(`Running on port: ${ process.env.PORT }`);

})();
