import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma.js';
import { apiSuccess, apiError } from '@/lib/response.js';
import { createPostSchema } from '@/lib/validate.js';
import { withAuth } from '@/lib/auth.js';

// Public/Open route (or partly protected) to get posts with pagination & search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;

    // Filter query
    const where = search ? {
      OR: [
        { title: { contains: search } },
        { content: { contains: search } }
      ]
    } : {};

    // Parallel fetch for data and total count
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.post.count({ where })
    ]);

    return apiSuccess({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get Posts Error:', error);
    return apiError('Internal server error', 500);
  }
}

// Protected route to create post
const createPostHandler = async (request) => {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createPostSchema.safeParse(body);
    if (!validatedData.success) {
      return apiError(validatedData.error.errors[0].message, 400);
    }
    
    const { title, content } = validatedData.data;

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: request.user.id, // from auth middleware
      },
      include: {
        user: { select: { id: true, name: true } }
      }
    });

    return apiSuccess({ post, message: 'Post created successfully' }, 201);
  } catch (error) {
    console.error('Create Post Error:', error);
    return apiError('Internal server error', 500);
  }
};

export const POST = withAuth(createPostHandler);
