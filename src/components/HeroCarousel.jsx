import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  "assets/images/1.jpg",
  "assets/images/2.jpg",
  "assets/images/3.jpg",
  "assets/images/4.jpg",
  "assets/images/5.jpg",
];

const HeroCarousel = () => {
  return (
    <div className="relative w-full aspect-[1360/300] mb-10 overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={550}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none">
        <button
          className="swiper-button-prev-custom bg-blue-600 bg-opacity-30 text-white p-1 sm:p-2 md:p-3 rounded-full hover:bg-opacity-50 transition pointer-events-auto cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          className="swiper-button-next-custom bg-blue-600 bg-opacity-30 text-white p-1 sm:p-2 md:p-3 rounded-full hover:bg-opacity-50 transition pointer-events-auto cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
