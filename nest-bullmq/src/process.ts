import { NestFactory } from '@nestjs/core';
import { JobsModule } from './jobs/jobs.module';

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);
  app.init();
}

bootstrap();
