import { NextResponse } from 'next/server';

/**
 * Format a standard success response
 */
export const apiSuccess = (data, status = 200) => {
  return NextResponse.json({ success: true, ...data }, { status });
};

/**
 * Format a standard error response
 */
export const apiError = (message, status = 400) => {
  return NextResponse.json({ success: false, error: message }, { status });
};
