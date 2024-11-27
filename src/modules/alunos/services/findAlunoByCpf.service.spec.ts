import { Test, TestingModule } from "@nestjs/testing";
import { IAlunoRepositories } from "../domain/repositories/IAluno.Repositories";
import { FindAlunoByCpfService } from "./findAlunoByCpf.service";
import { ALUNO_SERVICE_TOKEN } from "../utils/alunosServiceToken";
import { NotFoundException } from "@nestjs/common";

const alunoMock = {
  id: 1,
  ALUNO_NOME: 'Teste',
  ALUNO_CPF: '123.456.789-00',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('FindAlunoByCpfService', () => {
  let service: FindAlunoByCpfService;
  let alunoRepositories: IAlunoRepositories;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAlunoByCpfService,
        {
          provide: ALUNO_SERVICE_TOKEN,
          useValue: {
            findAlunoByCpf: jest.fn().mockResolvedValue(alunoMock),
          },
        },
      ],
    }).compile();

    service = module.get<FindAlunoByCpfService>(FindAlunoByCpfService);
    alunoRepositories = module.get<IAlunoRepositories>(ALUNO_SERVICE_TOKEN);
  });

  it('Estrutura definida', () => {
    expect(service).toBeDefined();
  });

  it('Deve lançar uma exeção de not found quando o aluno nao for encontrado', async () => {
    jest.spyOn(alunoRepositories, 'findAlunoByCpf').mockResolvedValue(null);

    await expect(service.execute(alunoMock.ALUNO_CPF)).rejects.toThrow(NotFoundException);
  })

  it('Deve retornar o aluno correspondente ao CPF digitado', async () => {
    jest.spyOn(alunoRepositories, 'findAlunoByCpf').mockResolvedValue(alunoMock);

    const result = await service.execute(alunoMock.ALUNO_CPF);
    
    expect(alunoRepositories.findAlunoByCpf).toHaveBeenCalledWith(alunoMock.ALUNO_CPF);
    expect(result).toEqual(alunoMock);
  })
});
