import prisma from '@/lib/prisma.js';
import { apiSuccess, apiError } from '@/lib/response.js';
import { withAuth, isAdmin } from '@/lib/auth.js';

// Admin only route to get all users
const getUsersHandler = async (request) => {
  try {
    if (!isAdmin(request.user)) {
      return apiError('Forbidden: Admin access only', 403);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return apiSuccess({ users });
  } catch (error) {
    console.error('Get Users Error:', error);
    return apiError('Internal server error', 500);
  }
};

export const GET = withAuth(getUsersHandler);
