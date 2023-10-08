document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".yp-slider");

  // is called when the DOM is loaded, builds the slider and adds the event listeners
  const buildSlider = (slider, visibleSlides) => {
    // check if slider exists
    if (!slider) return;

    const ui = {
      track: slider.querySelector(".yp-slider__track"),
      slides: slider.querySelectorAll(".yp-slider__slide"),
      prev: slider.querySelector(".yp-slider__button-prev"),
      next: slider.querySelector(".yp-slider__button-next"),
    };

    // check if slider elements exist
    if (!ui.track || !ui.slides || !ui.prev || !ui.next) return;

    // check if the visibleSlides is less than the total slides the visible slides should be the total slides
    if (visibleSlides > ui.slides.length) visibleSlides = ui.slides.length;

    const data = {
      current: 0,
      first: 0,
      last: 0,
      direction: 0,
      total: ui.slides.length,
      width: getSlideWidth(slider, visibleSlides),
    };

    // initialize the slider
    initSlider(ui.slides, data.width);

    // add event listeners to the prev button
    ui.prev.addEventListener("click", () => {});

    // add event listeners to the next button
    ui.next.addEventListener("click", () => {});
  };

  // get the slide width
  const getSlideWidth = (slider, visible) => {
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visible;

    return slideWidth;
  };

  // set the width of the slides and set the initial position of the slider track
  const initSlider = (slides, width) => {
    slides.forEach((slide) => {
      slide.style.width = `${width}px`;
    });
  };

  buildSlider(slider, 4);
});
