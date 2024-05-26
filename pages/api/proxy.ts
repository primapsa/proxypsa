import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Добавление заголовков ко всем запросам
    req.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMThlZjVjOTFjNDkzNDA5NGY2ZTk3YzUzNDEwYjQ1MyIsInN1YiI6IjY2M2Y5NmVjMTMyNzIxZjUxODIxMGJjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MHRIcWru0tXRfowkGqX1dJnfJoTCMAnKn3WDWY5ilYQ';
    req.headers['X-Custom-Header'] = 'your-custom-header-value';

    // Перенаправление на целевой сервер
    proxy.web(req, res, {
        target: 'https://api.themoviedb.org',
        changeOrigin: true,
        selfHandleResponse: false,
    });
}

export const config = {
    api: {
        bodyParser: false, // Отключение парсинга тела запроса
    },
};
