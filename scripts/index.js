document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".yp-slider");

  // is called when the DOM is loaded, builds the slider and adds the event listeners
  const buildSlider = (slider, visibleSlides) => {
    const sliderTrack = slider.querySelector(".yp-slider__track");
    const slides = Array.from(slider.querySelectorAll(".yp-slider__slide"));
    const leftButton = slider.querySelector(".yp-slider__button-left");
    const rightButton = slider.querySelector(".yp-slider__button-right");

    // add the first and last slide to the beginning and end of the slides array and update the slider track
    const lastSlideIndex = slides.length - 1;
    const firstSlide = slides[lastSlideIndex].cloneNode(true);
    const lastSlide = slides[0].cloneNode(true);

    const totalSlides = createTotalSlidesArray(slides, firstSlide, lastSlide);
    updateSliderTrack(sliderTrack, totalSlides);

    // set the slide width
    const sliderWidth = slider.getBoundingClientRect().width;
    const slideWidth = sliderWidth / visibleSlides;

    // shift the slider track to the left by the width of one slide
    shiftSliderTrack(totalSlides, sliderTrack, slideWidth);

    leftButton.addEventListener("click", () => {
      shiftSlidesLeft(totalSlides, sliderTrack);
    });

    rightButton.addEventListener("click", () => {
      shiftSlidesRight(totalSlides, sliderTrack, slideWidth);
    });
  };

  // creates an array of slides
  const createTotalSlidesArray = (slides, firstSlide, lastSlide) => {
    return [firstSlide, ...slides, lastSlide];
  };

  // updates the slider track with the new slides
  const updateSliderTrack = (sliderTrack, totalSlides) => {
    sliderTrack.innerHTML = "";
    totalSlides.forEach((slide, index) => {
      slide.dataset.index = index;
      sliderTrack.appendChild(slide);
    });
  };

  // shifts the slides to the left
  const shiftSlidesLeft = (totalSlides, sliderTrack) => {
    const lastSlide = totalSlides.pop();
    const secondToLastSlide =
      totalSlides[totalSlides.length - 2].cloneNode(true);
    totalSlides.unshift(secondToLastSlide);
    updateSliderTrack(sliderTrack, totalSlides);
  };

  // shifts the slides to the right
  const shiftSlidesRight = (totalSlides, sliderTrack, slideWidth) => {
    sliderTrack.style.transform = `translateX(${-slideWidth});`;

    const firstSlide = totalSlides.shift();
    const secondSlide = totalSlides[1].cloneNode(true);
    totalSlides.push(secondSlide);
    updateSliderTrack(sliderTrack, totalSlides);
  };

  const shiftSliderTrack = (totalSlides, sliderTrack, slideWidth) => {
    totalSlides.forEach((slide) => (slide.style.width = `${slideWidth}px`));
    sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
  };

  buildSlider(slider, 3);
});
