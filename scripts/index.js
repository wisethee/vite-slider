document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".yp-slider");

  // is called when the DOM is loaded, builds the slider and adds the event listeners
  const buildSlider = (slider, visibleSlides) => {
    // check if slider exists
    if (!slider) return;

    // get the slider elements
    const sliderTrack = slider.querySelector(".yp-slider__track");
    const slides = Array.from(slider.querySelectorAll(".yp-slider__slide"));

    // get the slider buttons
    const [prevButton, nextButton] = [
      ".yp-slider__button-prev",
      ".yp-slider__button-next",
    ].map((selector) => slider.querySelector(selector));

    // check if slider elements exist
    if (!sliderTrack || !slides || !prevButton || !nextButton) return;

    // check if the visibleSlides is less than the total slides the visible slides should be the total slides
    if (visibleSlides > slides.length) visibleSlides = slides.length;

    // default variables
    let currentIndex = 0;

    // initialize the slider
    initSlider(slides, sliderTrack, visibleSlides);

    // set and array with the total slides
    let totalSlides = Array.from(sliderTrack.children);

    // add event listeners the left button
    prevButton.addEventListener("click", () => {
      currentIndex === 0
        ? (currentIndex = totalSlides.length - 1)
        : currentIndex--;

      // remove the last slide from the DOM and add a new one at the beginning based on the currentIndex
      shiftSlider(totalSlides, 1);
    });

    // add event listeners the right button
    nextButton.addEventListener("click", () => {
      currentIndex === totalSlides.length - 1
        ? (currentIndex = 0)
        : currentIndex++;

      // remove the first slide and add a new one at the end based on the currentIndex
      shiftSlider(totalSlides, -1);
    });
  };

  const shiftSlider = (slides, direction) => {};

  // get the slide width
  const getSlideWidth = (slider, visibleSlides) => {
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visibleSlides;

    return slideWidth;
  };

  const cloneSlides = (slides, sliderTrack, visibleSlides) => {
    const firstSlide = slides[slides.length - 1].cloneNode(true);
    sliderTrack.prepend(firstSlide);
    const lastSlide = !(visibleSlides < slides.length)
      ? slides[0].cloneNode(true)
      : null;

    lastSlide && sliderTrack.append(lastSlide);
    const totalSlides = [firstSlide, ...slides, lastSlide];

    return totalSlides;
  };

  // clone the first and last slide and add them to the slider,
  // set the width of the slides and set the initial position
  // of the slider track
  const initSlider = (slides, sliderTrack, visibleSlides) => {
    const slideWidth = getSlideWidth(slider, visibleSlides);

    const totalSlides = cloneSlides(slides, sliderTrack, visibleSlides);

    totalSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
  };

  buildSlider(slider, 4);
});
