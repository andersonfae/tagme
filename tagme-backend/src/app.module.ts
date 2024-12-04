import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        return { uri: mongod.getUri() };
      },
    }),
    ItemsModule, // Certifique-se de que este módulo está registrado
  ],
})
export class AppModule {}
