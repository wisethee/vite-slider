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

    let isAnimating = false;

    leftButton.addEventListener("click", () => {
      if (!isAnimating) {
        isAnimating = true;
        animateSliderTrack(sliderTrack, slideWidth, () => {
          isAnimating = false;
        });
      }
    });

    rightButton.addEventListener("click", () => {
      if (!isAnimating) {
        isAnimating = true;
        animateSliderTrack(sliderTrack, -slideWidth, () => {
          isAnimating = false;
        });
      }
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

  const shiftSliderTrack = (totalSlides, sliderTrack, slideWidth) => {
    totalSlides.forEach((slide) => (slide.style.width = `${slideWidth}px`));
    sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
  };

  const animateSliderTrack = (
    sliderTrack,
    offset,
    onComplete,
    duration = 500
  ) => {
    const startTime = performance.now();
    const initialTransform = parseFloat(
      getComputedStyle(sliderTrack).transform.split(",")[4]
    );

    const animate = (currentTime) => {
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const newOffset = initialTransform + offset * progress;
        sliderTrack.style.transform = `translateX(${newOffset}px)`;
        requestAnimationFrame(animate);
      } else {
        sliderTrack.style.transform = `translateX(${
          initialTransform + offset
        }px)`;
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  };

  buildSlider(slider, 6);
});
