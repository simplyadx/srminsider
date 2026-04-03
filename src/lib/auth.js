import { verifyToken } from './jwt.js';
import { apiError } from './response.js';
import prisma from './prisma.js';

/**
 * Middleware wrapper for API route handlers to protect them
 */
export const withAuth = (handler) => {
  return async (request, context) => {
    try {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return apiError('Unauthorized: Missing or invalid token', 401);
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      
      if (!decoded || !decoded.userId) {
        return apiError('Unauthorized: Invalid or expired token', 401);
      }
      
      // Fetch user to ensure they still exist
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      
      if (!user) {
        return apiError('Unauthorized: User no longer exists', 401);
      }
      
      // Remove password from user object
      const { password, ...userWithoutPassword } = user;
      
      // We pass the user object in the context or by modifying the request
      request.user = userWithoutPassword;
      
      return handler(request, context);
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return apiError('Internal server error during authentication', 500);
    }
  };
};

/**
 * Helper to check if current user is admin
 */
export const isAdmin = (user) => {
  return user && user.role === 'ADMIN';
};
