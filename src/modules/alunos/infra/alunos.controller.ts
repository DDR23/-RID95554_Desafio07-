import { Controller } from '@nestjs/common';
import { AlunosService } from '../services/alunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(
    private readonly alunosService: AlunosService,
  ) { }
}
