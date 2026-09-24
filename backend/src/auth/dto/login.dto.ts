import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class DevLoginDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}

export class MaxAuthDto {
  @IsString()
  @IsNotEmpty()
  initData: string; // сырая строка initData от WebApp MAX
}

