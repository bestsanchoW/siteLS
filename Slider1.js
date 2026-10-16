class FlexSlider {
    constructor(selector) {
      this.slider = document.querySelector(selector);
      this.list = this.slider.querySelector('.slider-list');
      this.items = this.slider.querySelectorAll('.slider-element');
      this.leftArrow = this.slider.querySelector('.slider-arrow-left');
      this.rightArrow = this.slider.querySelector('.slider-arrow-right');
      this.dotsContainer = this.slider.querySelector('.slider-dots');
      this.current = 1;
      this.transitionTime = 500;
      this.varListTranslateX = '';
      this.cloneSlides();
      this.items = this.slider.querySelectorAll('.slider-element');
      this.realSlidesCount = this.items.length - 2;
      this.itemWidth = this.items[0].offsetWidth - 60;
      this.leftArrow.addEventListener('click', () => this.prev());
      this.rightArrow.addEventListener('click', () => this.next());

      window.addEventListener('resize', () => {
        this.itemWidth = this.items[0].offsetWidth - 60;
        this.scrollTo(this.current, false);
      });
      this.createDots();
      this.scrollTo(this.current, false);
      this.updateDots();
    }
    cloneSlides() {
      const first = this.items[0].cloneNode(true);
      const last = this.items[this.items.length - 1].cloneNode(true);
      this.list.insertBefore(last, this.items[0]);
      this.list.appendChild(first);
    }
    scrollTo(index, animated = true) {
      this.current = index;
      const offset = index * this.itemWidth;
      let transformValue;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (windowWidth > 1285) {
        transformValue = `translateX(calc(-${offset}px - 262.5px - 17.5%))`;
      } else if (windowWidth > 710) {
        transformValue = `translateX(calc(-${offset}px - 1110px + 50%))`;
      } else {
        transformValue = `translateX(calc(-${offset}px - 761px))`;
      }
      if (!animated) {
        this.list.style.transition = "none";
      } else {
        this.list.style.transition = "transform 0.5s ease-in-out";
      }
      this.list.style.transform = transformValue;

      setTimeout(() => {
        this.list.style.transition = "transform 0.5s ease-in-out";
      }, 50);
      this.updateDots();
    }
    next() {
      this.current++;
      this.scrollTo(this.current);
      if (this.current === this.items.length - 1) {
        setTimeout(() => {
          this.current = 1;
          this.scrollTo(this.current, false);
        }, this.transitionTime);
      }
    }
    prev() {
      this.current--;
      this.scrollTo(this.current);
      if (this.current === 0) {
        setTimeout(() => {
          this.current = this.items.length - 2;
          this.scrollTo(this.current, false);
        }, this.transitionTime);
      }
    }
    createDots() {
      this.dots = [];
      this.dotsContainer.innerHTML = '';
      for (let i = 0; i < this.realSlidesCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          this.current = i + 1;
          this.scrollTo(this.current);
        });
        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
      }
    }
    updateDots() {
      const realIndex = (this.current - 1 + this.realSlidesCount) % this.realSlidesCount;
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === realIndex);
      });
    }
  } 
  document.addEventListener('DOMContentLoaded', () => {
    new FlexSlider('#mySlider');
  });