/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/api/proxy/:path*',
            },

        ];
    },
};

export default nextConfig;
