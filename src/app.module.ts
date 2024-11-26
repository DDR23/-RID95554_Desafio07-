import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AlunosModule } from './modules/alunos/alunos.module';

@Module({
  imports: [
    PrismaModule,
    AlunosModule,
  ],
})
export class AppModule { }
