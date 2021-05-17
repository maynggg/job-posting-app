import { IsDateString, IsString, IsOptional } from 'class-validator';

export class UpdateVacancyDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  expiredAt: Date;
}
