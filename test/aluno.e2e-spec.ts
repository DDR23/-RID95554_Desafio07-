import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "src/app.module";
import { CreateAlunoDto } from "src/modules/alunos/domain/dto/create-aluno.dto";
import { PrismaService } from "src/modules/prisma/prisma.service";

describe('AlunosController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let alunoCpf: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.aluno.deleteMany({});
    await app.close();
  });

  describe('/alunos/create (POST)', () => {
    it('Deve retornar sucesso na criação ao enviar dados validos', async () => {
      const createAluno: CreateAlunoDto = {
        ALUNO_NOME: 'Nome do aluno',
        ALUNO_CPF: '123.456.789-00',
      };
      const response = await request(app.getHttpServer())
        .post('/alunos/create')
        .send(createAluno)
        .expect(201);

      alunoCpf = response.body.ALUNO_CPF;

      expect(response.body).toMatchObject({
        ALUNO_NOME: createAluno.ALUNO_NOME,
        ALUNO_CPF: createAluno.ALUNO_CPF,
      });
    });

    it('Deve retornar um ConflictException quando o CPF ja estiver cadastrado', async () => {
      const createAluno: CreateAlunoDto = {
        ALUNO_NOME: 'Nome do aluno',
        ALUNO_CPF: '123.456.789-00',
      };
      const response = await request(app.getHttpServer())
        .post('/alunos/create')
        .send(createAluno)
        .expect(409);

      expect(response.body.message).toEqual('Já existe um aluno cadastrado com esse CPF');
    });

    it('Deve retornar erro quando a criação falhar', async () => {
      const createAluno = {
        ALUNO_NOME: 'Nome',
        ALUNO_CPF: 12345678901,
      };

      const response = await request(app.getHttpServer())
        .post('/alunos/create')
        .send(createAluno)
        .expect(500)

      expect(response.body.message).toContain('Internal server error');
    });
  });

  describe('/alunos/:cpf (GET)', () => {
    it('Deve retornar um aluno existende quando o cpf for encontrado', async () => {
      const response = await request(app.getHttpServer())
        .get(`/alunos/${alunoCpf}`)
        .expect(200);

      expect(response.body).toMatchObject({
        ALUNO_NOME: 'Nome do aluno',
        ALUNO_CPF: alunoCpf,
      });
    });

    it('Deve retornar um NotFoundException quando o cpf nao for encontrado', async () => {
      const cpfInvalido = '999.999.999-99';

      const response = await request(app.getHttpServer())
        .get(`/alunos/${cpfInvalido}`)
        .expect(404)

      expect(response.body.message).toEqual('Aluno nao existe.')
    });
  });

  describe('/alunos (GET)', () => {
    it('Deve retornar um array de alunos', async () => {
      const response = await request(app.getHttpServer())
        .get(`/alunos`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('ALUNO_CPF');
      }
    });

    it('Deve retornar um NotFoundException quando o objeto retornado for < 1', async () => {
      await prisma.aluno.deleteMany({});

      const response = await request(app.getHttpServer())
        .get('/alunos')
        .expect(404)

      expect(response.body.message).toEqual('Não existem alunos cadastrados');
    });
  });
});
