// components/Banner.tsx

import React from 'react';
import Image from 'next/image';


type BannerProps = {
  backgroundImage: string;
};

const Banner: React.FC<BannerProps> = ({ backgroundImage }) => {
    
  return (
    <div className="banner-top">
              <figure >
              <Image
                src={backgroundImage}
                alt="A group of people participating in an outdoor activity"
                width={100}
                height={100}
                
                />
            </figure>
    </div>
  );
};

export default Banner;
