import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Проверка на наличие req.url
    if (!req.url) {
        res.status(500).json({ error: 'Request URL is missing' });
        return;
    }

    // Извлечение пути из запроса и построение нового URL для целевого сервера
    const targetUrl = `https://api.themoviedb.org${req.url.replace('/api/proxy', '')}`;

    // Добавление заголовков ко всем запросам
    req.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMThlZjVjOTFjNDkzNDA5NGY2ZTk3YzUzNDEwYjQ1MyIsInN1YiI6IjY2M2Y5NmVjMTMyNzIxZjUxODIxMGJjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MHRIcWru0tXRfowkGqX1dJnfJoTCMAnKn3WDWY5ilYQ';
    req.headers['X-Custom-Header'] = `${targetUrl}`;
    console.log(`Proxying request to: ${targetUrl}`);
    // Перенаправление на целевой сервер
    proxy.web(req, res, {
        target: targetUrl,
        changeOrigin: true,
        selfHandleResponse: false,
    });
}

export const config = {
    api: {
        bodyParser: false, // Отключение парсинга тела запроса
    },
};
