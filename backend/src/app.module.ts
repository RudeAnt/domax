import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TicketsModule } from './tickets/tickets.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5433', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'rootpassword',
      database: process.env.DATABASE_NAME || 'domax',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TicketsModule,
    // TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

