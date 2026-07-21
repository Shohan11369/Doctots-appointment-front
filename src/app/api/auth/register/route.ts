import { register } from '@/services/authService';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await register(data);
    
    return successResponse(result, 201);
  } catch (error) {
    return errorResponse('Registration failed', 500);
  }
}
