// Remove this if you're not using Fullcalendar features
const path = require('path');


module.exports = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: { plugins: [{ removeViewBox: false }] }
                    }
                }
            ]
        });
        return config;
    },
    async redirects() {
        return [
            {
                source: '/docs',
                destination: '/docs/welcome',
                permanent: true
            },
            {
                source: '/dashboard',
                destination: '/dashboard/campaigns',
                permanent: true
            }
        ];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};
