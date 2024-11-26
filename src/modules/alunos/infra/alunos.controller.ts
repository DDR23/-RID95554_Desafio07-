import { Body, Controller, Post } from '@nestjs/common';
import { CreateAlunoService } from '../services/createAluno.service';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(
    private readonly createAlunoService: CreateAlunoService,
  ) { }

  @Post('create')
  createAluno(
    @Body() data: CreateAlunoDto,
  ) {
    return this.createAlunoService.execute(data);
  }
}
