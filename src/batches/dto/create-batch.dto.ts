import { IsString, IsNotEmpty, IsNumber, IsDateString, Min, IsIn } from 'class-validator';

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
  @IsIn(['growing', 'ready', 'lost', 'archived'], {
    message: 'Статус партии должен быть: growing, ready, lost или archived',
  })
  status!: string;
}
