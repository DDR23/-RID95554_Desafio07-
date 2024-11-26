import { Module } from '@nestjs/common';
import { PrismaModule } from './module/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [],
})
export class AppModule { }
