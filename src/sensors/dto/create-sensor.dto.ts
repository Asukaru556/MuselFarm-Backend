import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsIn } from 'class-validator';

export class CreateSensorDto {
  @IsNumber()
  @IsNotEmpty()
  line_id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string; 

  @IsString()
  @IsNotEmpty()
  @IsIn(['temperature', 'salinity', 'oxygen', 'turbidity', 'depth'], {
    message: 'sensor_type должен быть одним из: temperature, salinity, oxygen, turbidity, depth',
  })
  sensor_type!: string;

  @IsString()
  @IsNotEmpty()
  serial_number!: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active!: boolean;
}
