import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  expiredAt: Date;
}
