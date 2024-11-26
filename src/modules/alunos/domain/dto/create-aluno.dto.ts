import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  ALUNO_NOME: string;

  @IsString()
  @IsNotEmpty()
  ALUNO_CPF: string;
}
