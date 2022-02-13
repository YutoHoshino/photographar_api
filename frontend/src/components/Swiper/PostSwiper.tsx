import { useState } from 'react';
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { CardMedia } from '@material-ui/core';

SwiperCore.use([Navigation, Pagination]);

type Props = {
  postdata: {
    photos: Array<{
      id: number,
      image?: {
        url: string
      },
      post_id: number,
      created_at: Date,
      updated_at: Date,
  }>,
  };
};

export const PostSwiper: React.FC<Props> = ({ postdata }) => {
  
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
        {postdata.photos.map((photo, index) => {
          return (
            <SwiperSlide key={photo.id}>
              <CardMedia
              onClick={() => slideTo(index)}
                component="img"
                height="400"
                image={photo.image?.url}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};