import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const rawPort = process.env.PORT ?? '3000';
  const port = Number(rawPort);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`PORT must be an integer between 1 and 65535; received "${rawPort}".`);
  }

  const host = process.env.HOST ?? '127.0.0.1';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(port, host);
}

void bootstrap().catch((error: unknown) => {
  console.error('Failed to start API:', error);
  process.exitCode = 1;
});
