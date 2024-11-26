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
