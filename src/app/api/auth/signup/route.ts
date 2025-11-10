/**
 * Signup API Route
 * POST /api/auth/signup
 */

import { NextRequest, NextResponse } from 'next/server';
import { SignupUseCase } from '@/domain/usecases/SignupUseCase';

const signupUseCase = new SignupUseCase();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await signupUseCase.execute(body.email, body.password, body.name);

    return NextResponse.json(
      { user, message: 'Signup successful' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Signup failed' },
      { status: 400 }
    );
  }
}
