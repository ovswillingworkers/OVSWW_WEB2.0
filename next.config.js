/** @type {import('next').NextConfig} */
const nextConfig = {
 
  webpack(config){
    config.module.rules.push({
      test:/\.svg$/,
      use:[{loader: '@svgr/webpack', options:{icon:true}}]
    })
    return config
  },

  // images: {
  //   domains: ['localhost'],
  //   path: '/public/assets/',
  //   formats: ["image/webp"],
  // },
    
  experimental: {
    appDir: true,
  },
  
}

module.exports = nextConfig;
