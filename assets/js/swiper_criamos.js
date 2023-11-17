import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const swiperSettings = {
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
}

initializeSwiper(swiperSettings);
