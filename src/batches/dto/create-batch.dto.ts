import { IsString, IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateBatchDto {
  @IsNumber()
  @IsNotEmpty()
  line_id!: number;

  @IsString()
  @IsNotEmpty()
  batch_number!: string;

  @IsDateString()
  @IsNotEmpty()
  seed_date!: string;

  @IsNumber()
  @Min(1)
  initial_count!: number;

  @IsString()
  @IsNotEmpty()
  status!: string;
}
