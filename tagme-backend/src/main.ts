import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import necessário
import { join } from 'path';

async function bootstrap() {
  // Altere o tipo da aplicação para NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura rota estática para servir arquivos de upload
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Prefixo para acessar as imagens
  });

  // Habilitando CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir somente o frontend local
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos permitidos
    credentials: true, // Permitir cookies, se necessário
  });

  await app.listen(3000);
}
bootstrap();
