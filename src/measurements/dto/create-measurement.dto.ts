import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateMeasurementDto {
  @IsNumber()
  @IsNotEmpty()
  sensor_id!: number;

  @IsNumber()
  @IsNotEmpty()
  line_id!: number;

  @IsString()
  @IsNotEmpty()
  parameter!: string;

  @IsNumber()
  @IsNotEmpty()
  value!: number;

  @IsString()
  @IsNotEmpty()
  unit!: string;

  @IsDateString()
  @IsNotEmpty()
  measured_at!: string;
}
