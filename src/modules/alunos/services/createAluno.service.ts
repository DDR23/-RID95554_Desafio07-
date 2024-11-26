import { Inject, Injectable } from '@nestjs/common';
import { IAlunoRepositories } from '../domain/repositories/IAlunosRepositories';
import { ALUNO_SERVICE_TOKEN } from '../utils/alunosServiceToken';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { Aluno } from '@prisma/client';

@Injectable()
export class CreateAlunoService {
  constructor(
    @Inject(ALUNO_SERVICE_TOKEN)
    private readonly alunoRepositories: IAlunoRepositories,
  ) { }

  async execute(data: CreateAlunoDto): Promise<Aluno> {
    // TODO - adicionar verificação de existecia de aluno
    return await this.alunoRepositories.createAluno(data);
  }
}
