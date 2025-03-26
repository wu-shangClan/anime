import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { FaPlayCircle, FaAngleRight, FaAngleLeft, FaClock, FaCalendar, FaTv } from 'react-icons/fa';

const Slider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % data.spotlightAnimes.length;
    setCurrentIndex(nextIndex);
    swiperRef.current?.swiper.slideTo(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + data.spotlightAnimes.length) % data.spotlightAnimes.length;
    setCurrentIndex(prevIndex);
    swiperRef.current?.swiper.slideTo(prevIndex);
  };

  return (
    <div className="deslide-wrap">
      <div className="container">
        <Swiper
          ref={swiperRef}
          className="swiper-container-initialized swiper-container-horizontal"
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          <div className="swiper-wrapper">
            {data.spotlightAnimes?.map((anime, index) => (
              <SwiperSlide
                key={index}
                className={`swiper-slide`}
                style={{ width: '100%' }}
              >
                <div className="deslide-item">
                  <div className="deslide-cover relative h-[90vh]">
                    <div className="deslide-cover-img absolute inset-0">
                      <img
                        className="w-full h-full object-cover"
                        src={anime.poster}
                        alt={anime.name}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end">
                      <div className="deslide-item-content text-white p-8 max-w-2xl">
                        <div className="desi-sub-text text-sm font-semibold mb-2 text-gray-500">
                          <span className="mr-2">#{anime.rank}</span>
                          Spotlight
                        </div>
                        <div className="desi-head-title text-5xl font-bold mb-4">{anime.name}</div>
                        <div className="sc-detail flex gap-4 mb-4 text-sm">
                          <div className="scd-item flex items-center">
                            <FaTv className="mr-1"/>
                          </div>
                          <div className="scd-item flex items-center">
                            <FaClock className="mr-1"/>
                            {anime.otherInfo[1]}
                          </div>
                          <div className="scd-item m-hide flex items-center">
                            <FaCalendar className="mr-1"/>
                            {anime.otherInfo[2]}
                          </div>
                        </div>
                        <div className="rating-container flex gap-1 mb-4">
                          <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded">HD</div>
                          <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded flex items-center">
                            <span className="text-green-400 mr-1">★</span>12
                          </div>
                          <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded flex items-center">
                            <span className="text-blue-400 mr-1">♦</span>12
                          </div>
                        </div>
                        <div className="desi-description text-sm text-gray-300 mb-6 line-clamp-3">
                          {anime.description || "After graduating from high school, Natsuko Hirose starts her career as an animator. Her talent quickly flourishes, and she makes her debut as a..."}
                        </div>
                        <div className="desi-button mt-6 flex ">
                          <a href={`/anime/${anime.id}/episodes`} className="btn bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-full flex items-center w-fit">
                            <FaPlayCircle className="mr-2"/>
                            Watch Now
                          </a>
                          <a href={`/anime/${anime.id}`} className="btn bg-gray-700/50 hover:bg-gray-700 text-white px-5 py-2 rounded-full mt-2 flex items-center w-fit">
                            Detail
                            <FaAngleRight className="ml-1"/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
          <div className="absolute bottom-8 right-8 z-10 flex gap-4">
            <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center bg-gray-500/20 hover:bg-gray-500/40 rounded-full transition-colors">
              <FaAngleLeft className="text-white text-xl"/>
            </button>
            <button onClick={handleNext} className="w-12 h-12 flex items-center justify-center bg-gray-500/20 hover:bg-gray-500/40 rounded-full transition-colors">
              <FaAngleRight className="text-white text-xl"/>
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;