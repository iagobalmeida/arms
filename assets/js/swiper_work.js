import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const swiperSettings = {
  autoplay: {
    delay: 3000
  },
  loop: true,
  init: false,
  spaceBetween: 0,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
};

const initializeSwiper = (swiperSettings) => {
  const swiper = new Swiper(".swiper", swiperSettings);
  swiper.init();
  // document.querySelector('#button-slide-next').addEventListener('click', () => {
  //   if(swiper.isEnd) {
  //     swiper.slideTo(0)
  //   } else {
  //     swiper.slideNext();
  //   }
  // });
  // document.querySelector('#button-slide-prev').addEventListener('click', () => {
  //   if(swiper.isStart) {
  //     swiper.slideTo(swiper.slides.length-1)
  //   } else {
  //     swiper.slidePrev();
  //   }
  // });
}

initializeSwiper(swiperSettings);
