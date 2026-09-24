import { UserRole } from '../users/entities/user.entity';

export interface JwtPayload {
  sub: string; // user.id
  role: UserRole;
}
