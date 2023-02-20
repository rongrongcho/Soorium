window.onload = function () {
  // ======================================================페이지 한 장 씩 이동 시작 ============//
  var elm = ".box";
  // let event;
  $(elm).each(function (index) {
    // 개별적으로 Wheel 이벤트 적용
    $(this).on("mousewheel DOMMouseScroll", function (e) {
      e.preventDefault();
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;
      var moveTop = $(window).scrollTop();
      var elmSelecter = $(elm).eq(index);
      // 마우스휠을 위에서 아래로
      if (delta < 0) {
        if ($(elmSelecter).next() != undefined) {
          try {
            moveTop = $(elmSelecter).next().offset().top;
          } catch (e) {}
        }
        // 마우스휠을 아래에서 위로
      } else {
        if ($(elmSelecter).prev() != undefined) {
          try {
            moveTop = $(elmSelecter).prev().offset().top;
          } catch (e) {}
        }
      }

      // 화면 이동 0.8초(800)
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: moveTop + "px",
          },
          {
            duration: 800,
            complete: function () {},
          }
        );
    });
  });
  // ======================================================페이지 한 장 씩 이동 끝 ============//

  // visual

  // ======================================================S슬라이드 애니메이션 시작 ============//

  //01.슬라이드 영역 애니메이션

  $(".sSlide_con").append($(".sSlide_con li").clone());
  $(".sSlide_con li").clone().prependTo(".sSlide_con");

  // --------
  let index = 0;
  let sw = false;
  let auto;

  // ----------

  let liitem;
  let liw;
  let i;

  const ele = document.querySelector("#slideShow");
  const imgRect = ele.getBoundingClientRect().x;
  const liinfo = document.getElementsByClassName("sImgItem");
  // console.log(imgRect);
  // opa();
  // moveSlider(index);
  autoSlider();

  $(".left").click(function () {
    moveSlider(index);

    opa2();
    index--;
    console.log(index);
  });

  $(".right").click(function () {
    moveSlider(index);
    opa();
    index++;
    console.log(index);
  });

  $(".sSlide_con").hover(
    function () {
      clearInterval(auto);
    },
    function () {
      autoSlider();
    }
  );

  // -------------------------------------

  function moveSlider() {
    if (index > -3 && index < 21) {
      $(".sSlide_con>li")
        .stop(true)
        .animate({
          left: -(index * 350),
        });
    } else {
      $(".sSlide_con>li").stop(true).animate(stop);
    }
  }

  // 자동 이미지 슬라이더 구현 함수
  function autoSlider() {
    auto = setInterval(function () {
      if (index < 21 && sw == false) {
        $(".right").stop(true).trigger("click");
      } else {
        sw = true;
      }

      if (index > -1 && sw == true) {
        $(".left").stop(true).trigger("click");
      } else {
        sw = false;
      }
    }, 4000);
  }

  // 오파시티 메소드 ===========================================================

  function opa() {
    for (i = 0; i < liinfo.length; i++) {
      liitem = liinfo.item(i);
      liw = liitem.getBoundingClientRect().x;
      if (liw == imgRect + 350) {
        $(liitem).animate({
          opacity: 1,
          // boxShadow: none,
        });
      } else {
        $(liitem).animate(
          {
            opacity: 0.5,
          },
          3000
        );
      }
    }
  }

  function opa2() {
    for (i = 0; i < liinfo.length; i++) {
      liitem = liinfo.item(i);
      liw = liitem.getBoundingClientRect().x;
      if (liw == imgRect - 350) {
        $(liitem).animate({
          opacity: 1,
          // boxShadow: none,
        });
      } else {
        $(liitem).animate(
          {
            opacity: 0.5,
          },
          3000
        );
      }
    }
  }
  // 오파시티 메소드 ===========================================================

  // ======================================================슬라이드 애니메이션 끝 ============//

  // mmslide 애니메이션 시작==========================================

  ("use strict");

  class Carousel {
    constructor(el) {
      this.el = el;
      this.carouselOptions = ["previous", "add", "play", "next"];
      this.carouselData = [
        {
          id: "1",
          src: "images/mSlide01.jpg",
        },
        {
          id: "2",
          src: "images/mSlide02.jpg",
        },
        {
          id: "3",
          src: "images/mSlide03.jpg",
        },
        {
          id: "4",
          src: "images/mSlide04.jpg",
        },
        {
          id: "5",
          src: "images/mSlide05.jpg",
        },
      ];
      this.carouselInView = [1, 2, 3, 4, 5];
      this.carouselContainer;
      this.carouselPlayState;
    }

    mounted() {
      this.setupCarousel();
    }

    setupCarousel() {
      const container = document.createElement("div");
      const controls = document.createElement("div");
      this.el.append(container, controls);
      container.className = "carousel-container";
      controls.className = "carousel-controls";
      this.carouselData.forEach((item, index) => {
        const carouselItem = item.src
          ? document.createElement("img")
          : document.createElement("div");
        container.append(carouselItem);

        carouselItem.className = `carousel-item carousel-item-${index + 1}`;
        carouselItem.src = item.src;
        carouselItem.setAttribute("loading", "lazy");
        carouselItem.setAttribute("data-index", `${index + 1}`);
      });

      this.carouselOptions.forEach((option) => {
        const btn = document.createElement("button");
        const axSpan = document.createElement("span");

        axSpan.innerText = option;
        axSpan.className = "ax-hidden";
        btn.append(axSpan);

        btn.className = `carousel-control carousel-control-${option}`;
        btn.setAttribute("data-name", option);

        controls.append(btn);
      });

      this.setControls([...controls.children]);

      this.carouselContainer = container;
    }

    setControls(controls) {
      controls.forEach((control) => {
        control.onclick = (event) => {
          event.preventDefault();

          this.controlManager(control.dataset.name);
        };
      });
    }

    controlManager(control) {
      if (control === "previous") return this.previous();
      if (control === "next") return this.next();
      if (control === "add") return this.add();
      if (control === "play") return this.play();

      return;
    }

    previous() {
      this.carouselData.unshift(this.carouselData.pop());

      this.carouselInView.push(this.carouselInView.shift());

      this.carouselInView.forEach((item, index) => {
        this.carouselContainer.children[
          index
        ].className = `carousel-item carousel-item-${item}`;
      });

      this.carouselData.slice(0, 5).forEach((data, index) => {
        document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });
    }

    next() {
      this.carouselData.push(this.carouselData.shift());

      this.carouselInView.unshift(this.carouselInView.pop());

      this.carouselInView.forEach((item, index) => {
        this.carouselContainer.children[
          index
        ].className = `carousel-item carousel-item-${item}`;
      });

      this.carouselData.slice(0, 5).forEach((data, index) => {
        document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });
    }

    play() {
      const playBtn = document.querySelector(".carousel-control-play");
      const startPlaying = () => this.next();

      if (playBtn.classList.contains("playing")) {
        playBtn.classList.remove("playing");

        // setInterval 제거
        clearInterval(this.carouselPlayState);
        this.carouselPlayState = null;
      } else {
        playBtn.classList.add("playing");

        this.next();

        this.carouselPlayState = setInterval(startPlaying, 1500);
      }
    }
  }
  const el = document.querySelector(".carousel");
  const exampleCarousel = new Carousel(el);
  exampleCarousel.mounted();
  // mmslide 애니메이션끝==========================================
};
