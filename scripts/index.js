document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".yp-slider");
  const autoplayInterval = 3000;

  const buildSlider = (slider, visibleSlides) => {
    // check if slider exists
    if (!slider) return;

    const ui = {
      track: slider.querySelector(".yp-slider__track"),
      slides: [...slider.querySelectorAll(".yp-slider__slide")],
      prev: slider.querySelector(".yp-slider__prev"),
      next: slider.querySelector(".yp-slider__next"),
    };

    // check if slider elements exist
    if (!ui.track || !ui.slides || !ui.prev || !ui.next) return;

    // check if the visibleSlides is less than the total slides the visible slides should be the total slides
    if (visibleSlides > ui.slides.length) visibleSlides = ui.slides.length;

    // set the initial data
    const data = {
      animating: false,
      direction: 1,
      prev: 0,
      current: 1,
      next: 2,
      total: ui.slides.length,
      visible: visibleSlides,
      width: getSlideWidth(slider, visibleSlides),
    };

    // initialize the slider
    initSlider(data, ui);

    let touchStartX = 0;
    let touchEndX = 0;

    // add event listeners to the prev button
    ui.prev.addEventListener("click", () => shiftSlide(data, ui, -1));

    // add event listeners to the next button
    ui.next.addEventListener("click", () => shiftSlide(data, ui, 1));

    ui.track.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    });

    ui.track.addEventListener("touchmove", function (e) {
      touchEndX = e.changedTouches[0].clientX;
    });

    ui.track.addEventListener("touchend", function (e) {
      handleSwipe(data, ui, touchStartX, touchEndX);
    });

    return { visibleSlides, data, ui };
  };

  const throttle = (func, limit) => {
    let inThrottle;
    let lastContext;
    let lastArgs;

    return function () {
      const args = arguments;
      const context = this;

      if (!inThrottle || context !== lastContext || args !== lastArgs) {
        func.apply(context, args);
        lastContext = context;
        lastArgs = args;

        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };

  const handleSwipe = (data, ui, touchStartX, touchEndX) => {
    if (touchEndX < touchStartX) {
      shiftSlide(data, ui, 1);
    }
    if (touchEndX > touchStartX) {
      shiftSlide(data, ui, -1);
    }
    touchStartX = 0;
    touchEndX = 0;
  };

  const moveSlide = (data, ui) => {
    if (data.animating) return;

    data.animating = true;
    let start, progress;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      progress = timestamp - start;

      if (data.direction === 1) {
        // move the first slide to the end
        ui.track.appendChild(ui.slides[data.prev]);
        ui.slides[data.prev].style.transform = `translateX(${data.width}px)`;

        // move current slide to the left
        ui.slides[
          data.current
        ].style.transform = `translateX(-${data.width}px)`;

        // move next slide to the current position
        ui.slides[data.next].style.transform = `translateX(0px)`;
      } else if (data.direction === -1) {
        // move the current slide to the end
        ui.slides[data.current].style.transform = `translateX(${data.width}px)`;

        // move the first slide to the current position
        ui.slides[data.prev].style.transform = `translateX(0px)`;

        // move the last slide to the first position
        ui.track.insertBefore(ui.slides[ui.slides.length - 1], ui.slides[0]);
        ui.slides[
          ui.slides.length - 1
        ].style.transform = `translateX(-${data.width}px)`;
      }

      if (progress < 500) {
        // if the animation is not finished, continue
        requestAnimationFrame(animate);
      } else {
        // if the animation is finished, update the state
        data.animating = false;
        updateSlides(data, ui);
      }
    };

    requestAnimationFrame(animate);
  };

  const shiftSlide = throttle((data, ui, direction) => {
    if (data.animating) return;
    data.direction = direction;
    moveSlide(data, ui);
  }, 500);

  const updateSlides = (data, ui) => {
    const newSlides = slider.querySelectorAll(".yp-slider__slide");
    ui.slides = [...newSlides];
  };

  // get the slide width
  const getSlideWidth = (slider, visibleSlides) => {
    const sliderWidth = slider.offsetWidth;
    const slideWidth = sliderWidth / visibleSlides;
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

    // set the slider track height
    ui.track.style.height = `${ui.slides[0].getBoundingClientRect().height}px`;

    // move last slide to the front
    ui.track.insertBefore(ui.slides[ui.slides.length - 1], ui.slides[0]);

    // update the slides
    updateSlides(data, ui);
  };

  const startAutoplay = (data, ui) => {
    return setInterval(() => {
      shiftSlide(data, ui, 1);
    }, autoplayInterval);
  };

  const stopAutoplay = (autoplayId) => {
    clearInterval(autoplayId);
  };

  const { visibleSlides, data, ui } = buildSlider(slider, 1);

  // Start autoplay when the document is loaded
  let autoplayId = startAutoplay(data, ui);

  // Stop autoplay when the user interacts with the slider
  slider.addEventListener("mouseenter", () => {
    stopAutoplay(autoplayId);
  });

  // Resume autoplay when the user leaves the slider
  slider.addEventListener("mouseleave", () => {
    autoplayId = startAutoplay(data, ui);
  });
});
