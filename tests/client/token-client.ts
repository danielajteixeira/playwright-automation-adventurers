import { APIRequestContext } from '@playwright/test';

export async function getToken(request: APIRequestContext) {
    const response = await request.post('/api/auth/token', {
        data:{
            username: 'danielat',
            password: 'K5q!R8m@N2x#L7pV',
        },
    });
   const responseToken = await response.json();
   
   return responseToken.token;
}