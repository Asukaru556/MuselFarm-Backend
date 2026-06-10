import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty() login!: string;
  @IsString() @IsNotEmpty() password!: string;
  @IsString() @IsOptional() full_name?: string;
  @IsEmail() @IsOptional() email?: string;
  @IsString() @IsOptional() role?: string;
}
