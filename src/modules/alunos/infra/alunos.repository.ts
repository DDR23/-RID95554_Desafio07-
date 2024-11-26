import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Aluno } from "@prisma/client";
import { CreateAlunoDto } from "../domain/dto/create-aluno.dto";
import { IAlunoRepositories } from "../domain/repositories/IAluno.Repositories";

@Injectable()
export class AlunoRepository implements IAlunoRepositories {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  createAluno(data: CreateAlunoDto): Promise<Aluno> {
    return this.prisma.aluno.create({ data });
  }

  findAlunoByCpf(data: string): Promise<Aluno> {
    return this.prisma.aluno.findUnique({ where: { ALUNO_CPF: data } });
  }
}
