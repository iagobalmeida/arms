import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const swiperSettings = {
  autoplay: {
    delay: 3000
  },
  loop: true,
  init: false,
  spaceBetween: 0,
  slidesPerView: 3
};

const initializeSwiper = (swiperSettings) => {
  const swiper = new Swiper(".swiper", swiperSettings);
  const targetSection = window.location.href.split("/#")[1];
  swiper.on("init", function () {
  });
  swiper.on("slideChange", function () {
  });
  swiper.init();
  document.querySelector('#button-slide-next').addEventListener('click', () => {
    swiper.slideNext();
  });
  document.querySelector('#button-slide-prev').addEventListener('click', () => {
    swiper.slidePrev();
  });
}

initializeSwiper(swiperSettings);
