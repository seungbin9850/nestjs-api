import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from 'ormconfig';
import { UserModule } from './modules';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), UserModule],
  providers: [],
})
export class AppModule {}
