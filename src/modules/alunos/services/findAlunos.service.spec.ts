import { Test, TestingModule } from '@nestjs/testing';
import { IAlunoRepositories } from '../domain/repositories/IAluno.Repositories';
import { ALUNO_SERVICE_TOKEN } from '../utils/alunosServiceToken';
import { FindAlunosService } from './findAlunos.service';
import { NotFoundException } from '@nestjs/common';

const alunoMock = {
  id: 1,
  ALUNO_NOME: 'Teste',
  ALUNO_CPF: '123.456.789-00',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('FindAlunosService', () => {
  let service: FindAlunosService;
  let alunoRepositories: IAlunoRepositories;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAlunosService,
        {
          provide: ALUNO_SERVICE_TOKEN,
          useValue: {
            findAlunos: jest.fn().mockResolvedValue([alunoMock]),
          },
        },
      ],
    }).compile();

    service = module.get<FindAlunosService>(FindAlunosService);
    alunoRepositories = module.get<IAlunoRepositories>(ALUNO_SERVICE_TOKEN);
  });

  it('Estrutura definida', () => {
    expect(service).toBeDefined();
  });

  it('Deve lançar uma exeção de NotFound quando nao houver aluno', async () => {
    jest.spyOn(alunoRepositories, 'findAlunos').mockResolvedValue([]);

    await expect(service.execute()).rejects.toThrow(NotFoundException);
  });

  it('Deve retornar uma lista de alunos', async () => {
    jest.spyOn(alunoRepositories, 'findAlunos').mockResolvedValue([alunoMock]);

    const result = await service.execute();

    expect(alunoRepositories.findAlunos).toHaveBeenCalled();
    expect(result).toEqual([alunoMock]);
  })
});
