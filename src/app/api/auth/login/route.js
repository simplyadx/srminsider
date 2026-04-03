import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma.js';
import { apiSuccess, apiError } from '@/lib/response.js';
import { loginSchema } from '@/lib/validate.js';
import { signToken } from '@/lib/jwt.js';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = loginSchema.safeParse(body);
    if (!validatedData.success) {
      return apiError(validatedData.error.errors[0].message, 400);
    }
    
    const { email, password } = validatedData.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return apiError('Invalid email or password', 401);
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return apiError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = signToken({ userId: user.id, role: user.role });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return apiSuccess({ 
      user: userWithoutPassword, 
      token,
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Login Error:', error);
    return apiError('Internal server error', 500);
  }
}
