import { Module } from '@nestjs/common';
import { AlunosController } from './infra/alunos.controller';
import { AlunosService } from './services/alunos.service';

@Module({
  controllers: [
    AlunosController,
  ],
  providers: [
    AlunosService,
  ],
})
export class AlunosModule { }
