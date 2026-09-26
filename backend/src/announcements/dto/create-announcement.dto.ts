import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({ example: 'Плановое отключение воды' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '27 сентября с 10:00 до 14:00 будет отключена холодная вода на всём доме.' })
  @IsString()
  @IsNotEmpty()
  body: string;
}

