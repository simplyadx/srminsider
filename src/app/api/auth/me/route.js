import { apiSuccess } from '@/lib/response.js';
import { withAuth } from '@/lib/auth.js';

// Protected route to get current user info
const getMeHandler = async (request) => {
  return apiSuccess({ user: request.user });
};

export const GET = withAuth(getMeHandler);
