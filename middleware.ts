// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);

    // Добавление заголовка ко всем запросам
    requestHeaders.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMThlZjVjOTFjNDkzNDA5NGY2ZTk3YzUzNDEwYjQ1MyIsInN1YiI6IjY2M2Y5NmVjMTMyNzIxZjUxODIxMGJjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MHRIcWru0tXRfowkGqX1dJnfJoTCMAnKn3WDWY5ilYQ');
    requestHeaders.set('X-Custom-Header', 'your-custom-header-value');

    const response = NextResponse.next();
    response.headers.set('Authorization', requestHeaders.get('Authorization'));
    response.headers.set('X-Custom-Header', requestHeaders.get('X-Custom-Header'));

    return response;
}

export const config = {
    matcher: '/:path*',
};
