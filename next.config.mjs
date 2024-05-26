/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'https://api.themoviedb.org/:path*',
            },

        ];
    },
};

export default nextConfig;
