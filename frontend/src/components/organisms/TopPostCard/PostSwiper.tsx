import { useState } from 'react';

import { CardMedia } from '@material-ui/core';

import Box from '@mui/material/Box';

// swipper
import 'swiper/css';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';


// interface
import { Photo } from 'interfaces/get/Photo';

SwiperCore.use([Navigation, Pagination]);

interface Props {
  photos: Array<Photo>,
}

export const PostSwiper: React.FC<Props> = ({ photos }) => {
  
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const slideTo = (index: number) => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(index);
  };
  return (
    <>
      <Box 
        sx={{ width: { xs: '375px', md: '100%'} }}
      >
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
                  height="400"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
};