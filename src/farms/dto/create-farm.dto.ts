import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsString()
  @IsOptional()
  description?: string;
}
