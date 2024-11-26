import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAlunoService } from '../services/createAluno.service';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { FindAlunoByCpfService } from '../services/findAlunoByCpf.service';
import { FindAlunosService } from '../services/findAlunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(
    private readonly createAlunoService: CreateAlunoService,
    private readonly findAlunoByCpfService: FindAlunoByCpfService,
    private readonly findAlunosService: FindAlunosService,
  ) { }

  @Post('create')
  createAluno(
    @Body() data: CreateAlunoDto,
  ) {
    return this.createAlunoService.execute(data);
  }

  @Get(':cpf')
  findAlunoByCpf(
    @Param('cpf') data: string,
  ) {
    return this.findAlunoByCpfService.execute(data);
  }

  @Get('')
  findAlunos() {
    return this.findAlunosService.execute();
  }
}
