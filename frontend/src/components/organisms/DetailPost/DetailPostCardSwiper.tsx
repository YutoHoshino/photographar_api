import { useState } from 'react';

import CardMedia from '@mui/material/CardMedia';

// interface 
import { PhotosSwipper } from 'interfaces';

// swipper
import 'swiper/css';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export const DetaiPostCardlSwiper: React.FC<PhotosSwipper> = ({ photos }) => {
  
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const slideTo = (index: number) => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(index);
  };
  return (

    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      onSwiper={(swiper) => setSwiperInstance(swiper)}
    >
      {photos.map((photo, index) => {
        return (
          <SwiperSlide key={photo.id}>
            <CardMedia
              onClick={() => slideTo(index)}
              component="img"
              image={photo.image?.url}
              sx={{ 
                height: { xs: '300px', md: '600px'},
              }}
              />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};