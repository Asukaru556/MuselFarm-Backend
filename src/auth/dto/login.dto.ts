import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Логин не должен быть пустым' })
  login!: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
  password!: string;
}
