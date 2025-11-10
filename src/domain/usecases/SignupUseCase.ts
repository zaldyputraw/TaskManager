/**
 * Signup Use Case
 * Business logic for user registration
 */

import { User } from '../entities/User';
import { ValidationError } from '../errors/DomainError';

export class SignupUseCase {
  async execute(email: string, password: string, name: string): Promise<User> {
    // Validate input
    if (!email || !password || !name) {
      throw new ValidationError('Email, password, and name are required');
    }

    User.validateEmail(email);

    if (password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters');
    }

    if (name.trim().length === 0) {
      throw new ValidationError('Name cannot be empty');
    }

    // In a real application, you would:
    // 1. Check if email already exists
    // 2. Hash password using bcrypt
    // 3. Create user in database
    // 4. Return user

    // For now, return mock data
    const newUser = new User({
      id: 1,
      email,
      name,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return newUser;
  }
}
