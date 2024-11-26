import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ALUNO_SERVICE_TOKEN } from "../utils/alunosServiceToken";
import { IAlunoRepositories } from "../domain/repositories/IAluno.Repositories";
import { Aluno } from "@prisma/client";

@Injectable()
export class FindAlunoByCpfService {
  constructor(
    @Inject(ALUNO_SERVICE_TOKEN)
    private readonly alunoRepositories: IAlunoRepositories,
  ) { }

  async execute(data: string): Promise<Aluno> {
    const aluno = await this.alunoRepositories.findAlunoByCpf(data);
    if (!aluno) throw new NotFoundException('Aluno nao existe.');
    return aluno;
  }
}
