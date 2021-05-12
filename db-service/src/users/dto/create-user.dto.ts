import { IsEnum, IsNotEmpty } from 'class-validator';

const Role = {
  ADMIN: 'admin',
  USER: 'user',
};

export class CreateUserDto {
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: string;
}
