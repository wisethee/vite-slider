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
      prevSlide: 0,
      currentSlide: 0,
      nextSlide: 0,
    };

    // check if slider elements exist
    if (!ui.track || !ui.slides || !ui.prev || !ui.next) return;

    // check if the visibleSlides is less than the total slides the visible slides should be the total slides
    if (visibleSlides > ui.slides.length) visibleSlides = ui.slides.length;

    const data = {
      animating: false,
      direction: 0,
      prev: 0,
      current: 0,
      next: 0,
      total: ui.slides.length,
      width: getSlideWidth(slider, visibleSlides),
    };

    // initialize the slider
    initSlider(data, ui, data.width);

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
    updateSliderPosition(data, ui, data.width);

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

  const updateSliderPosition = (data, ui, width) => {
    ui.slides.forEach((slide, index) => {
      const position = (index - data.current + data.total) % data.total;
      const translation = position * width;

      slide.style.transform = `translateX(${translation}px)`;
    });
  };

  // set the width of the slides and set the initial position of the slider track
  const initSlider = (data, ui, width) => {
    // set the width of the slides
    ui.slides.forEach((slide) => {
      slide.style.width = `${width}px`;
    });

    // set the initial position of the ui.slides
    ui.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * width}px)`;
      const translation =
        index === data.current ? 0 : (index - data.current) * width;

      // set the initial position of the slides
      slide.style.transform = `translateX(${translation}px)`;
    });

    updateSliderPosition(data, ui, width);
  };

  buildSlider(slider, 3);
});
