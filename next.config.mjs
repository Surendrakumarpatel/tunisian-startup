/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.veenaworld.com'
            },
            {
                protocol:'https',
                hostname:'utfs.io'
            },
            {
                protocol:'https',
                hostname:'media.licdn.com'
            }, 
            {
                protocol:'https',
                hostname:'hips.hearstapps.com'
            },
            {
                protocol:'https',
                hostname:'www.revv.co.in'
            },
        ]
    },
};

export default nextConfig;
