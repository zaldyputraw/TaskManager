/**
 * Login API Route
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { LoginUseCase } from '@/domain/usecases/LoginUseCase';

const loginUseCase = new LoginUseCase();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { user, token } = await loginUseCase.execute(body.email, body.password);

    return NextResponse.json(
      { user, token, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
