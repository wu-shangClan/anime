import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { FaPlayCircle, FaAngleRight, FaAngleLeft, FaClock, FaCalendar, FaClosedCaptioning, FaMicrophone } from 'react-icons/fa';

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
                style={{ width: '555px' }}
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
                    <div className="absolute inset-0 bg-black/50 p-8 flex flex-col justify-end">
                      <div className="deslide-item-content text-white">
                        <div className="desi-sub-text text-lg font-semibold mb-2">Spotlight</div>
                        <div className="desi-head-title text-4xl font-bold mb-4">{anime.name}</div>
                        <div className="sc-detail flex gap-4 mb-4">
                          <div className="scd-item flex items-center">
                            <FaPlayCircle className="mr-1"/>
                            {anime.type}
                          </div>
                          <div className="scd-item flex items-center">
                            <FaClock className="mr-1"/>
                            {anime.otherInfo[1]}
                          </div>
                          <div className="scd-item m-hide flex items-center">
                            <FaCalendar className="mr-1"/>
                            {anime.otherInfo[2]}
                          </div>
                          <div className="scd-item mr-1 flex items-center">
                            <span className="quality bg-white/10 px-2 py-1 rounded">{anime.otherInfo[3]}</span>
                          </div>
                        </div>
                        <div className="desi-description text-lg mb-6 line-clamp-3">{anime.description}</div>
                        <div className="tick flex gap-4 mb-6">
                          {anime.episodes?.sub && (
                            <div className="tick-item tick-sub flex items-center bg-white/10 px-3 py-1 rounded">
                              <FaClosedCaptioning className="mr-1"/>
                              {anime.episodes.sub}
                            </div>
                          )}
                          {anime.episodes?.dub && (
                            <div className="tick-item tick-dub flex items-center bg-white/10 px-3 py-1 rounded">
                              <FaMicrophone className="mr-1"/>
                              {anime.episodes.dub}
                            </div>
                          )}
                        </div>
                        <div className="desi-button mt-6 bg-black/10 px-3 py-1 rounded-[10px] w-fit">
                          <a href={`/anime/${anime.id}`} className="btn btn-primary">Watch Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
          <div className="absolute bottom-8 right-8 z-10 flex gap-4">
            <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <FaAngleLeft className="text-white text-xl"/>
            </button>
            <button onClick={handleNext} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <FaAngleRight className="text-white text-xl"/>
            </button>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;