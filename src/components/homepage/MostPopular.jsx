import React from 'react'
import AnimeCard from '../Anime/AnimeCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

const MostPopular = ({data}) => {
  return (
    <>
    {/* Most Popular Section */}
        {data?.mostPopularAnimes && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Most Popular</h2>
              <Swiper
                className="swiper-container-initialized swiper-container-horizontal"
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={4}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {data.mostPopularAnimes.map((anime, index) => (
                  <SwiperSlide
                    key={index}
                    className={`swiper-slide`}
                    style={{ width: '555px' }}
                  >
                    <AnimeCard key={index} anime={anime} showEpisodes={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        )}
    </>
  )
}

export default MostPopular