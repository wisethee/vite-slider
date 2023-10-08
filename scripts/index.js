document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".yp-slider");

  const buildSlider = (slider, visibleSlides) => {
    // check if slider exists
    if (!slider) return;

    const ui = {
      track: slider.querySelector(".yp-slider__track"),
      slides: slider.querySelectorAll(".yp-slider__slide"),
      prev: slider.querySelector(".yp-slider__prev"),
      next: slider.querySelector(".yp-slider__next"),
    };

    // check if slider elements exist
    if (!ui.slides || !ui.prev || !ui.next) return;

    // check if the visibleSlides is less than the total slides the visible slides should be the total slides
    if (visibleSlides > ui.slides.length) visibleSlides = ui.slides.length;

    const data = {
      animating: false,
      direction: 0,
      prev: 0,
      current: 0,
      next: 0,
      total: ui.slides.length,
      visible: visibleSlides,
      width: getSlideWidth(slider, visibleSlides),
    };

    // initialize the slider
    initSlider(data, ui);

    // add event listeners to the prev button
    ui.prev.addEventListener("click", () => shiftPrev(data, ui));

    // add event listeners to the next button
    ui.next.addEventListener("click", () => shiftNext(data, ui));
  };

  const changeSlide = (data, ui) => {
    data.animating = true;

    data.prevSlide = ui.slides[data.prev];
    data.currentSlide = ui.slides[data.current];
    data.nextSlide = ui.slides[data.next];

    // ...

    data.animating = false;
  };

  const shiftPrev = (data, ui) => {
    if (data.animating) return;

    data.direction = -1;

    data.prev = data.current;
    data.current = data.prev === 0 ? data.total - 1 : data.prev - 1;
    data.next = data.current === 0 ? data.total - 1 : data.current - 1;
    changeSlide(data, ui);
  };

  const shiftNext = (data, ui) => {
    if (data.animating) return;
    data.direction = 1;

    data.prev = data.current;
    data.current = data.prev === data.total - 1 ? 0 : data.prev + 1;
    data.next = data.current === data.total - 1 ? 0 : data.current + 1;
    changeSlide(data, ui);
  };

  // get the slide width
  const getSlideWidth = (slider, visible) => {
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visible;

    return slideWidth;
  };

  // set the width of the slides and set the initial position of the slider track
  const initSlider = (data, ui) => {
    // set the width of the slides
    ui.slides.forEach((slide) => {
      slide.style.width = `${data.width}px`;
    });

    ui.slides.forEach((slide, index) => {
      const translation =
        index < data.visible
          ? index * data.width
          : index >= data.visible && index < data.total - 1
          ? data.width * data.visible
          : undefined;

      if (translation !== undefined) {
        slide.style.transform = `translateX(${translation}px)`;
      }
    });

    // move the last slide before the first
    ui.track.insertBefore(ui.slides[ui.slides.length - 1], ui.slides[0]);
  };

  buildSlider(slider, 1);
});

// document.addEventListener("DOMContentLoaded", function () {
// Get all the slides
// var slides = document.querySelectorAll(".yp-slider__slide");

// [1] Move the last slide before the first
// slides[0].parentNode.insertBefore(slides[slides.length - 1], slides[0]);

//   document.querySelectorAll("button").forEach(function (button) {
//     button.addEventListener("click", function () {
//       // Get all the slides again
//       slides = document.querySelectorAll(".yp-slider__slide");
//       // Register button
//       var buttonId = button.id;
//       // Register active slide
//       var activeSlide = document.querySelector(".active");

//       // Next function
//       if (buttonId === "yp-slider__next") {
//         // Move first slide to the end
//         slides[slides.length - 1].parentNode.insertBefore(
//           slides[0],
//           slides[slides.length - 1].nextSibling
//         );
//         // Move active class to the right
//         activeSlide.classList.remove("active");
//         if (activeSlide.nextElementSibling) {
//           activeSlide.nextElementSibling.classList.add("active");
//         } else {
//           slides[0].classList.add("active");
//         }
//       }

//       // Previous function
//       if (buttonId === "yp-slider__prev") {
//         // Move the last slide before the first
//         slides[0].parentNode.insertBefore(slides[slides.length - 1], slides[0]);
//         // Move active class to the left
//         activeSlide.classList.remove("active");
//         if (activeSlide.previousElementSibling) {
//           activeSlide.previousElementSibling.classList.add("active");
//         } else {
//           slides[slides.length - 1].classList.add("active");
//         }
//       }
//     });
//   });
// });
