import { IsString, IsNotEmpty, IsNumber, Min, IsIn } from 'class-validator';

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
  @IsIn(['active', 'inactive', 'maintenance'], {
    message: 'Статус линии должен быть: active, inactive или maintenance',
  })
  status!: string;
}
