import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateObservationDto {
  @IsNumber()
  @IsNotEmpty()
  line_id!: number;

  @IsNumber()
  @IsNotEmpty()
  batch_id!: number;

  @IsNumber()
  @IsNotEmpty()
  fouling_percent!: number;

  @IsString()
  @IsNotEmpty()
  mussel_condition!: string;

  @IsNumber()
  @IsNotEmpty()
  mortality_percent!: number;

  @IsNumber()
  @IsNotEmpty()
  density!: number;

  @IsNumber()
  @IsNotEmpty()
  avg_size!: number;

  @IsNumber()
  @IsNotEmpty()
  avg_weight!: number;

  @IsBoolean()
  @IsNotEmpty()
  pathogen_present!: boolean;

  @IsString()
  @IsOptional()
  pathogen_type?: string;

  @IsString()
  @IsOptional()
  comment?: string;
}
