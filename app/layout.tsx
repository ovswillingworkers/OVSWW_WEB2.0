import { Provider } from "react-redux";
import QueryWrapper from "./auth/QueryWrapper";
import { appStore } from "./redux/store/store";
import ovsww_logo from "../public/favicon/favicon_io/favicon.ico";
export const metadata = {
  title: 'OVS Willing Workers',
  description: 'OVS Willing Workers is a community-driven organization that provides volunteer opportunities to support local causes and initiatives. Join us today to make a positive impact in your community!',
  icons: {
    icon: ovsww_logo.src,
  },
}



export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>

         <link rel="icon" href={ovsww_logo.src} />
         <meta property="og:title" content="OVS Willing Workers" />
         <meta property="og:description" content="OVS Willing Workers is a community-driven organization that provides volunteer opportunities to support local causes and initiatives. Join us today to make a positive impact in your community!" />

      </head>
      {/* <head>{metadata.title}
    
      <meta name="description" content="OVS Willing Workers is a community-driven organization that provides volunteer opportunities to support local causes and initiatives. Join us today to make a positive impact in your community!" />


        // 
        <meta property="og:description" content="OVS Willing Workers is a community-driven organization that provides volunteer opportunities to support local causes and initiatives. Join us today to make a positive impact in your community!" />
        
        
      
      </head> */}

      <body>
        {/* <Provider store={appStore}> */}
        <QueryWrapper>{children}</QueryWrapper>
        {/*  
          </Provider> */}
      </body>
    </html>
  );
}
