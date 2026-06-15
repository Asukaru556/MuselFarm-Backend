import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateLineDto {
  @IsNumber()
  @IsNotEmpty()
  location_id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  depth!: number;

  @IsNumber()
  @Min(0)
  length!: number;

  @IsString()
  @IsNotEmpty()
  status!: string;
}
