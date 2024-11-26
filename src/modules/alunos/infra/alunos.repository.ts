import { Injectable } from "@nestjs/common";
import { IAlunoRepositories } from "../domain/repositories/IAlunosRepositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Aluno } from "@prisma/client";
import { CreateAlunoDto } from "../domain/dto/create-aluno.dto";

@Injectable()
export class AlunoRepository implements IAlunoRepositories {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  createAluno(data: CreateAlunoDto): Promise<Aluno> {
    return this.prisma.aluno.create({ data });
  }
}