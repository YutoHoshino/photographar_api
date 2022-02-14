import { useState } from 'react';

import { CardMedia } from '@material-ui/core';

// interface 
import { PhotosSwipper } from 'interfaces';

// swipper
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export const PostSwiper: React.FC<PhotosSwipper> = ({ photos, height }) => {
  
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const slideTo = (index: number) => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(index);
  };
  return (
    <>
      <Swiper
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {photos.map((photo, index) => {
          return (
            <SwiperSlide key={photo.id}>
              <CardMedia
                onClick={() => slideTo(index)}
                component="img"
                image={photo.image?.url}
                height={height}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};