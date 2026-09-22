import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RequestCategory } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({ enum: RequestCategory, example: RequestCategory.LEAK })
  @IsEnum(RequestCategory)
  category: RequestCategory;

  @ApiProperty({ example: 'Течёт потолок в ванной, вода с соседнего этажа' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'ул. Тестовая, д. 1, кв. 12' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+7 900 000-00-01' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'data:image/png;base64,...' })
  @IsString()
  @IsOptional()
  photoDataUrl?: string;
}

