import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const slides = [
  { title: "somos", menuTheme: "light" },
  { title: "capicce", menuTheme: "dark" },
  { title: "projetar", menuTheme: "dark" },
  { title: "conta", menuTheme: "light" },
];
const slidesTitles = slides.map((s) => s.title);

const swiperSettings = {
  direction: "vertical",
  loop: false,
  init: false,
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

const headerEl = document.querySelector("header");
const swiper = new Swiper(".swiper", swiperSettings);

const setMenuTheme = (slideIndex) => {
  headerEl.classList.remove("light");
  headerEl.classList.remove("dark");
  swiper.el.classList.remove("light");
  swiper.el.classList.remove("dark");
  swiper.el.classList.add(slides[slideIndex].menuTheme);
  headerEl.classList.add(slides[slideIndex].menuTheme);
};

const targetSection = window.location.href.split("/#")[1];

swiper.on("init", function () {
  if (slidesTitles.includes(targetSection)) {
    const slideIndex = slidesTitles.indexOf(targetSection);
    swiper.slideTo(slideIndex);
  } else {
    setMenuTheme(this.activeIndex);
  }
});
swiper.on("slideChange", function () {
  setMenuTheme(this.activeIndex);
});
swiper.init();
