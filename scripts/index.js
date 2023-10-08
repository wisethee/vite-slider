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

    // remove the active class from all the slides
    removeAllClasses(ui.slides, "yp-slider__slide--current");
    removeAllClasses(ui.slides, "yp-slider__slide--next");

    data.currentSlide = ui.slides[data.current];
    data.nextSlide = ui.slides[data.next];

    // add the active class to the current slide
    data.currentSlide.classList.add("yp-slider__slide--current");
    data.nextSlide.classList.add("yp-slider__slide--next");

    // ...
    console.log(data.current, data.next);

    data.animating = false;
  };

  const removeAllClasses = (slides, className) => {
    slides.forEach((slide) => {
      slide.classList.remove(`${className}`);
    });
  };

  const shiftPrev = (data, ui) => {
    if (data.animating) return;
    data.direction = 1;

    data.prev = data.current;
    data.current = data.prev === 0 ? data.total - 1 : data.prev - 1;
    data.next = data.current === 0 ? data.total - 1 : data.current - 1;
    changeSlide(data, ui);
  };

  const shiftNext = (data, ui) => {
    if (data.animating) return;
    data.direction = -1;

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
  const initSlider = (data, ui, width) => {
    // set the width of the slides
    ui.slides.forEach((slide) => {
      slide.style.width = `${width}px`;
    });

    // set the initial position of the ui.slides
    ui.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * width}px)`;
    });

    ui.currentSlide = ui.slides[data.current].classList.add(
      "yp-slider__slide--current"
    );
  };

  buildSlider(slider, 3);
});
