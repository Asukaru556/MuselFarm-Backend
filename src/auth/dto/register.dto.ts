import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Логин обязателен' })
  login!: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль обязателен' })
  password!: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  role?: string;
}
