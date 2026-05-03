"use strict";
(function () {
  const contentsEls = document.querySelectorAll(".js-content");
  const thumbs = document.querySelectorAll(".js-thumb");

  const slider = document.querySelector(".js-slider");

  if (!slider) {
    return;
  }

  const swiperSlider = new Swiper(".js-slider", {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 39,
    initialSlide: 0,
    speed: 0,
    draggable: false,
    pagination: false,
    loop: false,
    allowTouchMove: false,
    slideToClickedSlide: false,
    on: {
      slideChange: function (e) {
        const vw = window.innerWidth;

        if (vw > 743) {
          return;
        }

        const currentSlide = e.slides[e.realIndex];

        if (!currentSlide) return;

        const locationNumber = currentSlide.dataset.thumbIndex;

        toggleContent(locationNumber);
      },
    },

    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 12,
        draggable: true,
        allowTouchMove: true,
        centeredSlides: true,
        loop: true,
      },

      744: {
        slidesPerView: "auto",
        spaceBetween: 15,
        draggable: true,
        allowTouchMove: true,
        speed: 300,
      },

      1025: {
        slidesPerView: "auto",
        spaceBetween: 39,
      },
    },
  });

  const map = document.querySelector(".js-map");
  const mapScroller = document.querySelector(".js-map-scroll");
  const mapModal = document.querySelector(".js-map-modal");
  const modalText = mapModal.querySelector(".js-map-modal-text");
  const modalGoTo = mapModal.querySelector(".js-map-modal-goto");
  const modalClose = mapModal.querySelector(".js-map-modal-close");
  const bullitItems = document.querySelectorAll(".js-bullit");

  const figures = map.querySelectorAll(".figure");

  const locations = {
    1: "Стритбол",
    2: "Стрельба из лука",
    3: "детская зона",
    4: "Скейт-парк",
    5: "Воркаут",
    6: "Паркур",
    7: "Фан-встречи",
    8: "ФК локомотив",
    9: "ФК динамо",
    10: "Городки",
    11: "Настольные игры",
    12: "Сайклинг",
    13: "Стронгмен",
    14: "Авиамоделирование, аквагрим",
    15: "Концерт",
    16: "Брейк-данс",
    17: "Бокс",
    18: "Шахматы",
    19: "Настольный теннис",
    20: "Стантрайдинг",
    21: "Гидрофлай",
    22: "Мотофристайл + багги",
    23: "Полоса препятствий",
    24: "Информационная стойка",
    25: "Панна-футбол",
    26: "Стретчинг",
  };
  getURls();
  // Функция для генерации
  function getURls() {
    Object.entries(locations).forEach(([index, value]) => {
      console.log(
        value,
        `https://day.sport.moscow/?locationId=${index}#locations`
      );
    });
  }

  // 32 убрать, когда заработает.
  const numbersWithoutAction = ["24"];

  const concertNumber = "15";
  const childZone = []; // TODO Поменять, когда нумерацию заменят!

  const partnersLinks = {};
  const vw = window.innerWidth;
  // ACTIONS

  setTimeout(() => {
    mapScroller?.scroll({ left: 275 });
  }, 500);

  figures.forEach((figure) => {
    figure.addEventListener("click", () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure);
    });
  });

  modalGoTo.addEventListener("click", () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  });

  modalClose.addEventListener("click", () => {
    closeModal();
  });

  thumbs.forEach((item) => {
    const thumbIndex = item.dataset.thumbIndex;
    item.addEventListener("click", () => {
      toggleContent(thumbIndex);
    });
  });

  init();

  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter("locationId");
    const artObjectLinks = document.querySelectorAll(".js-art-object-link");
    if (locationNumber) {
      setTimeout(() => {
        onGoToLocation(locationNumber);
      }, 0);
    }

    // Собираем легенду.
    fillLegendList();
    artObjectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      });
    });
    setTimeout(() => {
      reinitSlider(document.querySelector(`[data-content-index="1"]`));
    }, 300);

    bullitItems.forEach((item) => {
      item.addEventListener("click", (el) => {
        onGoToLocation(el.currentTarget.dataset.locationId);
      });
    });
  }

  function onFigureClick(figure) {
    modalGoTo.classList.remove("is-hidden");
    let locationNumber = figure.classList[1].split("_")[1];
    const mapOffset =
      document.getElementById("map-title").getBoundingClientRect().top +
      document.documentElement.scrollTop;

    const legendItem = document.querySelector(
      `.js-legend-item[data-legend-item-id="${locationNumber}"]`
    );

    if (locationNumber === concertNumber) {
      modalGoTo.href = "#concert";
    } else if (Object.keys(partnersLinks).includes(locationNumber)) {
      modalGoTo.target = "_blank";
      modalGoTo.href = partnersLinks[locationNumber];
    } else {
      modalGoTo.href = "#locations-slider";
    }

    if (numbersWithoutAction.includes(locationNumber)) {
      modalGoTo.classList.add("is-hidden");
    }

    window.scroll.animateScroll(mapOffset);

    if (figure.classList.contains("is-active")) {
      resetFigures();
      resetLegends();
      closeModal(locationNumber);
    } else {
      resetFigures();
      resetLegends();
      figure.classList.add("is-active");
      openModal(locationNumber);
      legendItem.classList.add("is-active");
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove("is-active");
    });
  }

  function resetLegends() {
    const legends = document.querySelectorAll(".js-legend-item");
    legends.forEach((legend) => {
      legend.classList.remove("is-active");
    });
  }

  function openModal(locationNumber) {
    if (!locations[locationNumber]) return;

    modalText.textContent = locations[locationNumber];

    let targetNumber = locationNumber;

    if (childZone.includes(locationNumber)) {
      targetNumber = 11;
    }

    modalGoTo.dataset.locationNumber = targetNumber;

    mapModal.classList.add("is-active");
  }

  function closeModal() {
    mapModal.classList.remove("is-active");
    setTimeout(() => {
      modalText.textContent = "";
      modalGoTo.dataset.locationNumber = "";
    }, 300);
    resetFigures();
    resetLegends();
  }

  function onGoToLocation(locationNumber) {
    let number = locationNumber;
    if (numbersWithoutAction.includes(number)) {
      return;
    }

    if (number === concertNumber) return;

    toggleContent(number);

    closeModal();

    swiperSlider.slideTo(getSlideIndex(number));
    // добавить скролл
  }

  function getSlideIndex(locationNumber) {
    const element = document.querySelector(
      `.js-thumb[data-thumb-index="${locationNumber}"]`
    );
    const elIndex = Array.from(element.parentNode.children).indexOf(element);
    return Number(elIndex);
  }

  function toggleContent(locationNumber) {
    const thumbs = document.querySelectorAll(".js-thumb");
    reinitSlider(
      document.querySelector(`[data-content-index="${locationNumber}"]`)
    );

    thumbs.forEach((item) => {
      item.classList.remove("is-active");
    });

    contentsEls.forEach((item) => {
      const contentIndex = item.dataset.contentIndex;
      if (Number(contentIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });

    thumbs.forEach((item) => {
      const thumbIndex = item.dataset.thumbIndex;

      if (Number(thumbIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });
  }

  function findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }

  function fillLegendList() {
    const container = document.querySelector(".js-legend-list");
    const wrapper = document.querySelector(".js-legend-wrapper");
    const button = document.querySelector(".js-legend-more-button");

    const locationsArray = Object.entries(locations);

    locationsArray.forEach(([index, value]) => {
      const figure = document.querySelector(`.figure_${index}`);
      // не показываем локации, которых нет на карте.
      if (!figure) return;

      const itemLi = document.createElement("li");
      const itemSpan = document.createElement("span");
      const itemP = document.createElement("p");

      itemLi.classList.add("map__list-item");
      itemLi.classList.add("js-legend-item");
      itemLi.dataset["legendItemId"] = index;

      itemLi.addEventListener("click", function () {
        onFigureClick(figure);
      });

      itemSpan.textContent = `${index}.`;
      itemP.textContent = value;
      itemLi.append(itemSpan);
      itemLi.append(itemP);
      container.append(itemLi);
    });

    button.addEventListener("click", function () {
      wrapper.classList.remove("more-hide");
    });
  }

  function reinitSlider(container) {
    const cont = container.querySelector(".js-people-slider-container");
    const slider = container.querySelector(".js-people-slider");

    const partnerSlider = container.querySelector(".js-partner-slider");

    const wrapper = slider?.querySelector(".swiper-wrapper");
    const partnersWrapper = partnerSlider?.querySelector(".swiper-wrapper");

    if (wrapper) {
      const id = slider.id;

      if (wrapper.childNodes.length > 3 && vw > 1024) {
        setTimeout(() => {
          new Swiper(`#${id}`, {
            // Optional parameters
            slidesPerView: 3,
            spaceBetween: 30,
            initialSlide: 0,
            draggable: false,
            pagination: false,
            loop: false,

            navigation: {
              nextEl: ".js-people-next-extreme",
              prevEl: ".js-people-prev-extreme",
            },
          });
        }, 300);
      } else {
        cont.classList.add("disabled");
      }
      return;
    }

    if (partnersWrapper) {
      if (partnersWrapper?.childNodes.length > 3 && vw >= 1024) {
        setTimeout(() => {
          new Swiper(`.js-partner-slider`, {
            // Optional parameters
            slidesPerView: "auto",
            spaceBetween: 30,
            initialSlide: 0,
            draggable: false,
            pagination: false,
            loop: false,
            navigation: {
              nextEl: ".js-people-next-concert",
              prevEl: ".js-people-prev-concert",
            },
          });
        }, 300);
      } else {
        cont.classList.add("disabled");
      }
    }
  }
})();
