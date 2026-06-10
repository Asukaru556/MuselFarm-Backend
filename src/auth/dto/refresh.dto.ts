import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @IsString()
  @IsNotEmpty({ message: 'Refresh токен обязателен' })
  refresh_token!: string;
}
