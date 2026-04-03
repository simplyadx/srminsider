import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma.js';
import { apiSuccess, apiError } from '@/lib/response.js';
import { signupSchema } from '@/lib/validate.js';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = signupSchema.safeParse(body);
    if (!validatedData.success) {
      return apiError(validatedData.error.errors[0].message, 400);
    }
    
    const { name, email, password } = validatedData.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return apiError('User with this email already exists', 400);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return apiSuccess({ user: userWithoutPassword, message: 'User created successfully' }, 201);
  } catch (error) {
    console.error('Signup Error:', error);
    return apiError('Internal server error', 500);
  }
}
