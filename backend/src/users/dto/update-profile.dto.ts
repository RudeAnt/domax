import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'ул. Тестовая, д. 1' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsNumber()
  apartment?: number;
}

