/**
 * Login Use Case
 * Business logic for user authentication
 */

import { User } from '../entities/User';
import { UnauthorizedError } from '../errors/DomainError';

export class LoginUseCase {
  async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    // Validate input
    if (!email || !password) {
      throw new UnauthorizedError('Email and password are required');
    }

    User.validateEmail(email);

    // In a real application, you would:
    // 1. Query database for user by email
    // 2. Compare password with hashed password using bcrypt
    // 3. Generate JWT token
    // 4. Return user and token

    // For now, return mock data (implement with actual authentication)
    const mockUser = new User({
      id: 1,
      email,
      name: 'Test User',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      user: mockUser,
      token: 'mock-jwt-token',
    };
  }
}
