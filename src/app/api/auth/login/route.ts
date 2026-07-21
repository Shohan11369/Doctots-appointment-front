import { login } from '@/services/authService';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Login attempt with:', data);
    
    const result = await login(data);
    return successResponse(result);
  } catch (error) {
    // Check if it's a fetch-related error
    console.error('Detailed Login Error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        data: 'Request data masked'
    });
    
    return errorResponse('Login failed - internal server error', 500);
  }
}
