import { User } from '@/domain/entities/User';
import { AuthResponseDTO } from '../dto/AuthDTO';

export class UserMapper {
  static toAuthResponseDTO(user: User, token: string): AuthResponseDTO {
    return {
      token: token,
      userId: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
