/** @type {import('next').NextConfig} */
const nextConfig = {
 
  webpack(config){
    config.module.rules.push({
      test:/\.svg$/,
      use:[{loader: '@svgr/webpack', options:{icon:true}}]
    })
    return config
  },
  images:{
    domains:["lh3.googleusercontent.com", "avatars.githubusercontent.com"]
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


// const withLess = require('@zeit/next-less');
// const lessToJS = require('less-vars-to-js');
// const fs = require('fs');
// const path = require('path');

// // Read the Ant Design theme variables from a file
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './styles/antd.less'), 'utf8')
// );

// const nextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: [{ loader: '@svgr/webpack', options: { icon: true } }],
//     });
//     return config;
//   },
//   images: {
//     domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
//   },
//   experimental: {
//     appDir: true,
//   },
// };

// module.exports = withLess({
//   lessLoaderOptions: {
//     javascriptEnabled: true,
//     modifyVars: themeVariables,
//   },
//   cssModules: true,
// })(nextConfig);
