import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const slides = [
  { title: "somos", classList: "light" },
  { title: "capricho", classList: "dark" },
  { title: "método", classList: "dark" },
  { title: "conta", classList: "light" },
];

const swiperSettings = {
  direction: "vertical",
  loop: false,
  init: false,
  hashNavigation: {
    watchState: true,
  },
  mousewheel: {
    sensitivity: 1,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '"><p>' +
        slides[index].title +
        "</p></span>"
      );
    },
  },
};

const initializeSwiper = (slides, swiperSettings) => {
  const slidesTitles = slides.map((s) => s.title);
  
  const headerEl = document.querySelector("header");
  const swiper = new Swiper(".swiper", swiperSettings);
  
  const setclassList = (slideIndex) => {
    headerEl.classList.remove("light");
    headerEl.classList.remove("dark");
    swiper.el.classList.remove("light");
    swiper.el.classList.remove("dark");
    swiper.el.classList.add(slides[slideIndex].classList);
    headerEl.classList.add(slides[slideIndex].classList);
  };
  
  const targetSection = decodeURIComponent(window.location.hash.substring(1))
  
  swiper.on("init", function () {
    if (slidesTitles.includes(targetSection)) {
      const slideIndex = slidesTitles.indexOf(targetSection);
      swiper.slideTo(slideIndex);
    } else {
      setclassList(this.activeIndex);
    }
  });
  swiper.on("slideChange", function () {
    setclassList(this.activeIndex);
    // window.history.pushState(null, null, '#' + slides[this.activeIndex].title)
  });
  swiper.init();
}

initializeSwiper(slides, swiperSettings);
