import { login } from '@/services/authService';
import { errorResponse, successResponse } from '@/lib/api-response';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Login attempt with:', data);
    
    const result = await login(data);
    
    // Create the response object
    const response = NextResponse.json({ success: true, data: result }, { status: 200 });
    
    // Set the cookie on the response object
    if (result.token) {
        response.cookies.set('token', result.token, {
            httpOnly: true,
            secure: false, // Force false for local development
            sameSite: 'lax',
            path: '/',
            maxAge: 86400 // 1 day
        });
    }
    return response;
  } catch (error) {
    console.error('Detailed Login Error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        data: 'Request data masked'
    });
    
    return NextResponse.json({ success: false, message: 'Login failed - internal server error' }, { status: 500 });
  }
}
