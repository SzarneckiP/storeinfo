/** 
 * @type {import('next').NextConfig}
 
 */
const nextConfig = {

    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=1, stale-while-revalidate=59',
                    },
                ],
            },
        ];
    },

    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
            'th.bing.com',
            'source.unsplash.com',
            'images.unsplash.com',
        ],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig