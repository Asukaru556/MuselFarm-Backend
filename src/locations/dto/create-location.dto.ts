import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  farm_id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @IsNumber()
  @Min(0)
  depth!: number;
}
