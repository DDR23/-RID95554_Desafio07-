import { Module } from '@nestjs/common';
import { AlunosController } from './infra/alunos.controller';
import { CreateAlunoService } from './services/createAluno.service';
import { ALUNO_SERVICE_TOKEN } from './utils/alunosServiceToken';
import { AlunoRepository } from './infra/alunos.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    AlunosController,
  ],
  providers: [
    CreateAlunoService,
    {
      provide: ALUNO_SERVICE_TOKEN,
      useClass: AlunoRepository,
    }
  ],
})
export class AlunosModule { }
