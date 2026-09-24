import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketCategory } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({ example: 'Течёт потолок в ванной' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: TicketCategory, example: TicketCategory.PLUMBING })
  @IsEnum(TicketCategory)
  @IsNotEmpty()
  category: TicketCategory;

  @ApiProperty({ example: 'Течёт потолок в ванной, вода с соседнего этажа' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'ул. Тестовая, д. 1' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsNumber()
  apartment?: number;

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  @IsString()
  @IsOptional()
  photoUrl?: string;
}

