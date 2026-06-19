import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  line_id!: number;

  @IsString()
  @IsNotEmpty()
  event_type!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  @IsOptional()
  event_time?: string;
}
