import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString() @IsOptional() password?: string;
  @IsString() @IsOptional() full_name?: string;
  @IsEmail() @IsOptional() email?: string;
  @IsString() @IsOptional() role?: string;
}
