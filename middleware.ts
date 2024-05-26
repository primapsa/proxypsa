// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);

    // Добавление заголовка ко всем запросам
    requestHeaders.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMThlZjVjOTFjNDkzNDA5NGY2ZTk3YzUzNDEwYjQ1MyIsInN1YiI6IjY2M2Y5NmVjMTMyNzIxZjUxODIxMGJjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MHRIcWru0tXRfowkGqX1dJnfJoTCMAnKn3WDWY5ilYQ');


    return NextResponse.rewrite(new URL(req.url, req.nextUrl.origin), {
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: '/:path*',
};
