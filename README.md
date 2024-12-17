## IMPORTANTE
Esse repositório foi criado e desenvolvido para o Backend do desafio 07 da escola DNC. Este é um aplicativo NestJS que fornece APIs para gerenciar alunos. O projeto utiliza Prisma como ORM e PostgreSQL como banco de dados.

Nesse `README.dm` é possivel encontrar informações sobre:

- [Etapas de desenvolvimento do desafio](#desenvolvimento)
- [Tecnologias usadas](#tecnologias)
- [Banco de dados](#banco)
- [Instalações](#instalacoes)
- [Funcionalidades](#funcionalidades)
- [Exemplos de uso](#exemplos)
- [Testes](#testes)

#### URL da API:
Obs: Essa api ainda nao foi hospedada.

#### Branchs:
- **main**
- **legacy** - nesta branch está o codigo original/antigo deste projeto

## Leia-me:
**Nota do aluno**: Depois de ler o contexto, analisar o projeto e entender os requisitos, para esse projeto que ainda estava em fase inicial, eu decidi que fazer uma migração total, não apenas da linguagem, mas de framework, de ORM e de linguagem.
**Esse projeto foi migrado totalmente** para uma aplicação que usa **NestJS** como framework principal, aplicando conceitos de **SOLID** e **TDD**, para ORM e banco de dados foi escolhido **Prisma** + **PostegreSQL**, e no caso do banco em específico, foi decidido usar uma imagem do **PostegreSQL no docker (postgres:16.4-alpine3.20)**. No que diz respeito a **teste de integração** e **unitários**, era um requisito do projeto ter apenas teste de integração, **porem tambem foram adicionados teste unitários em todas as services** da aplicação pra que o projeto tenha uma abrangencia maior em diversos cenários de teste. **A plicação dessas medidas, ao meu ver, tornará o projeto mais morderno, mais seguro, mais sólido, mais escalável e de melhor manutenção**.

---
<a id="desenvolvimento"></a>

# gerenciador-escolar-backend
# Desafio-07---Aplique-testes-de-integração-para-uma-API-utilizando-TypeScript---Escola-DNC

🎯Etapas de Desenvolvimento

### ETAPA-01 - Migração para TypeScript
- Instalação do TypeScript: Certifique-se de que você tem o TypeScript instalado globalmente ou no projeto. Caso não tenha, você pode instalar utilizando o npm: `npm install -g typescript`.
- Criação do arquivo de configuração TypeScript: Utilize o comando `tsc --init` para criar o arquivo *tsconfig.json*. Neste arquivo, você pode configurar as opções do TypeScript para atender às necessidades do projeto.
- Migração gradual: Comece a migrar seu código JavaScript para TypeScript, começando pelos principais arquivos e módulos. Isso envolve a adição de anotações de tipo aos seus objetos, funções e variáveis. Lembre-se de atualizar também as importações e exportações de módulos.

### ETAPA-02 - Configuração do Jest
- Instale o Jest como uma dependência de desenvolvimento no seu projeto: `npm install --save-dev jest @types/jest`.
- Configuração do arquivo de teste: Crie um arquivo de configuração para o Jest, geralmente chamado de `jest.config.js`. Configure as opções necessárias para o ambiente de teste, como os diretórios de testes, extensões de arquivo e outras configurações específicas do projeto.

### ETAPA-03 - Testes de Integração
- Estrutura de diretórios: Organize os testes em uma estrutura de diretórios clara e consistente. Separe os testes por módulo ou funcionalidade para facilitar a manutenção.
- Testes de Unidades vs. Testes de Integração: Certifique-se de que você está focando em testes de integração que abrangem múltiplos componentes e fluxos de funcionalidade. Isso pode incluir testes para chamadas de API, interações com bancos de dados e cenários de uso completos.
- Cobertura abrangente: Garanta que seus testes cubram diferentes cenários, incluindo entradas válidas e inválidas, para garantir que o sistema seja resiliente.

### ETAPA-04 -  Repositório em JS pronto
- Aproveite o código existente: Utilize a API em JavaScript que está pronta para transforma-la em TypeScript e logo depois instalar o JEST.
- Crie seu próprio repositório, se necessário: Se a API em JavaScript não atender às necessidades do projeto ou se for mais vantajoso começar do zero, crie seu próprio repositório. Certifique-se de documentar sua escolha e justificativa.

&nbsp;
<a id="tecnologias"></a>

## Tecnologias usadas
- Nest.js
- Prisma
- PostegreSQL
- Jest
- Docker

&nbsp;
<a id="banco"></a>

## Banco de dados
### Migration de criação da tabela alunos
```sql
-- CreateTable
CREATE TABLE "alunos" (
    "id" SERIAL NOT NULL,
    "ALUNO_NOME" TEXT NOT NULL,
    "ALUNO_CPF" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_ALUNO_CPF_key" ON "alunos"("ALUNO_CPF");

```

### Diagrama EER
![imgBB](https://i.ibb.co/jbP34cr/Captura-de-tela-2024-12-02-110037.png)

&nbsp;
<a id="instalacoes"></a>

## Instalações

&nbsp;
Comandos para clonar esse projeto.

 - Clone o repositorio:

```bash
  https://github.com/DDR23/RID-95554---Desafio-07
```
- Adicione o arquivo `.env`.

<a id="dotenv"></a>

```
DATABASE_URL="postgresql://desafio-07:desafio-07@localhost:5432/desafio-07-db-v1?schema=public"
```

- Dentro do repositorio execute:
```bash
  npm install
```
```bash
  npx prisma generate
```
```bash
  npx prisma migrate dev
```

- Execute o `docker-compose.yml`:
```bash
  docker-compose up -d
```

&nbsp;
<a id="funcionalidades"></a>

## Funcionalidades

- `/alunos/create` Cadastra um novo aluno, com CPF unico.
- `/alunos/:cpf` Retorna o aluno pelo CPF.
- `/alunos` Retorna todos os alunos cadastrados.

&nbsp;
<a id="exemplos"></a>

## Exemplos de uso

### /alunos/create

&nbsp;
**POST** - para inserir um novo registro
```http
https://localhost:8080/alunos/create
```
&nbsp;
É necessário passar esse objeto no body da requisição
```json
  {
    "ALUNO_NOME": STRING,
    "ALUNO_CPF": STRING
  }
```

### /alunos/:cpf

&nbsp;
**GET** - para listar um aluno por CPF
```http
https://localhost:8080/alunos/:cpf
```
&nbsp;
Obs: lembre-se se subistituir o `:cpf` por um cpf válido

### /alunos

&nbsp;
**GET** - para um listar todos os alunos
```http
https://localhost:8080/alunos
```

&nbsp;
<a id='testes'></a>

## Testes

O projeto inclui testes de ponta a ponta usando Jest e Supertest. Os testes cobrem os pontos de extremidade da API. Além de testes de integração, também foram feitos testes unitários em todos os serviços. use os comandos para executar:

#### Teste e2e (Integração):
```bash
npm run test:e2e
```

#### Testes unitários:
```bash
npx jest src/modules/alunos/services/<NomeDoArquivo.service.spec.ts>
```
