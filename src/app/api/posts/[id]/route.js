import prisma from '@/lib/prisma.js';
import { apiSuccess, apiError } from '@/lib/response.js';
import { updatePostSchema } from '@/lib/validate.js';
import { withAuth, isAdmin } from '@/lib/auth.js';

// Helper to extract ID from params
const getParams = async (paramsPromise) => {
  const resolved = await paramsPromise;
  return parseInt(resolved.id, 10);
};

// Public route to get single post
export async function GET(request, context) {
  try {
    const id = await getParams(context.params);
    
    if (isNaN(id)) {
      return apiError('Invalid post ID', 400);
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });

    if (!post) {
      return apiError('Post not found', 404);
    }

    return apiSuccess({ post });
  } catch (error) {
    console.error('Get Post Error:', error);
    return apiError('Internal server error', 500);
  }
}

// Protected route to update post
const updatePostHandler = async (request, context) => {
  try {
    const id = await getParams(context.params);
    
    if (isNaN(id)) {
      return apiError('Invalid post ID', 400);
    }

    // Check post exists and ownership
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return apiError('Post not found', 404);
    }

    // Only owner or admin can update
    if (post.userId !== request.user.id && !isAdmin(request.user)) {
      return apiError('Forbidden: You can only edit your own posts', 403);
    }

    const body = await request.json();
    const validatedData = updatePostSchema.safeParse(body);
    
    if (!validatedData.success) {
      return apiError(validatedData.error.errors[0].message, 400);
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: validatedData.data,
      include: {
        user: { select: { id: true, name: true } }
      }
    });

    return apiSuccess({ post: updatedPost, message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update Post Error:', error);
    return apiError('Internal server error', 500);
  }
};

export const PUT = withAuth(updatePostHandler);

// Protected route to delete post
const deletePostHandler = async (request, context) => {
  try {
    const id = await getParams(context.params);
    
    if (isNaN(id)) {
      return apiError('Invalid post ID', 400);
    }

    // Check post exists and ownership
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return apiError('Post not found', 404);
    }

    // Only owner or admin can delete
    if (post.userId !== request.user.id && !isAdmin(request.user)) {
      return apiError('Forbidden: You can only delete your own posts', 403);
    }

    await prisma.post.delete({ where: { id } });

    return apiSuccess({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete Post Error:', error);
    return apiError('Internal server error', 500);
  }
};

export const DELETE = withAuth(deletePostHandler);
