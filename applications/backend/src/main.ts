import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({
    origin: 'http://localhost:5177',
    credentials: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
