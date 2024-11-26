import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ALUNO_SERVICE_TOKEN } from "../utils/alunosServiceToken";
import { IAlunoRepositories } from "../domain/repositories/IAluno.Repositories";
import { Aluno } from "@prisma/client";

@Injectable()
export class FindAlunosService {
  constructor(
    @Inject(ALUNO_SERVICE_TOKEN)
    private readonly alunoRepositories: IAlunoRepositories,
  ) { }

  async execute(): Promise<Aluno[]> {
    const alunos = await this.alunoRepositories.findAlunos();
    if (!alunos) throw new NotFoundException('Não existem alunos cadastrados');
    return alunos;
  }
}
