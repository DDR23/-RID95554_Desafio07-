import { Test, TestingModule } from '@nestjs/testing';
import { CreateAlunoService } from './createAluno.service';
import { IAlunoRepositories } from '../domain/repositories/IAluno.Repositories';
import { ALUNO_SERVICE_TOKEN } from '../utils/alunosServiceToken';
import { ConflictException } from '@nestjs/common';

const alunoMock = {
  id: 1,
  ALUNO_NOME: 'Teste',
  ALUNO_CPF: '123.456.789-00',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('CreateAlunoService', () => {
  let service: CreateAlunoService;
  let alunoRepositories: IAlunoRepositories;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAlunoService,
        {
          provide: ALUNO_SERVICE_TOKEN,
          useValue: {
            createAluno: jest.fn().mockResolvedValue(alunoMock),
            findAlunoByCpf: jest.fn().mockResolvedValue(alunoMock),
          },
        },
      ],
    }).compile();

    service = module.get<CreateAlunoService>(CreateAlunoService);
    alunoRepositories = module.get<IAlunoRepositories>(ALUNO_SERVICE_TOKEN);
  });

  it('Estrutura definida', () => {
    expect(service).toBeDefined();
  });

  it('Deve verificar se o aluno ja existe', async () => {
    jest.spyOn(alunoRepositories, 'findAlunoByCpf').mockResolvedValue(alunoMock);

    const result = await alunoRepositories.findAlunoByCpf(alunoMock.ALUNO_CPF);

    expect(alunoRepositories.findAlunoByCpf).toHaveBeenCalledWith('123.456.789-00');
    expect(result).toEqual(alunoMock);
  });

  it('Deve lançar uma exeção de conflito quando o aluno já existir', async () => {
    jest.spyOn(alunoRepositories, 'findAlunoByCpf').mockResolvedValue(alunoMock);

    await expect(service.execute(alunoMock)).rejects.toThrow(ConflictException);
  });

  it('Deve criar um aluno', async () => {
    jest.spyOn(alunoRepositories, 'findAlunoByCpf').mockResolvedValue(null);

    const result = await service.execute({
      ALUNO_NOME: 'Teste',
      ALUNO_CPF: '123.456.789-00',
    });

    expect(alunoRepositories.createAluno).toHaveBeenCalledWith({
      ALUNO_NOME: 'Teste',
      ALUNO_CPF: '123.456.789-00',
    });
    expect(result).toEqual(alunoMock);
  });
});
