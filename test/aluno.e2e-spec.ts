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

  it('/alunos/create (POST)', async () => {
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

  it('/alunos/:cpf (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/alunos/${alunoCpf}`)
      .expect(200);

    expect(response.body).toMatchObject({
      ALUNO_NOME: 'Nome do aluno',
      ALUNO_CPF: alunoCpf,
    });
  });

  it('/alunos (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/alunos`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    if(response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('ALUNO_CPF');
    }
  });
});
