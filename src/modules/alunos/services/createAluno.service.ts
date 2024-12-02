import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ALUNO_SERVICE_TOKEN } from '../utils/alunosServiceToken';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { Aluno } from '@prisma/client';
import { IAlunoRepositories } from '../domain/repositories/IAluno.Repositories';

@Injectable()
export class CreateAlunoService {
  constructor(
    @Inject(ALUNO_SERVICE_TOKEN)
    private readonly alunoRepositories: IAlunoRepositories,
  ) { }

  async execute(data: CreateAlunoDto): Promise<Aluno> {
    const existeAluno = await this.alunoRepositories.findAlunoByCpf(data.ALUNO_CPF);
    if (existeAluno) throw new ConflictException('Já existe um aluno cadastrado com esse CPF');
    return await this.alunoRepositories.createAluno(data);
  }
}
