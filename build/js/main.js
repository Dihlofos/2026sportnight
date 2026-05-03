"use strict";
(function () {
  let upButton = document.querySelector(".up");

  if (upButton) {
    window.onscroll = function () {
      if (window.pageYOffset > 260) {
        upButton.classList.add("up--shown");
      } else {
        upButton.classList.remove("up--shown");
      }
    };
  }
})();

"use strict";
(function () {
  const key = "maraphon-cookie-modal-shown";
  let modal = document.querySelector(".js-cookie");
  if (!modal) {
    return;
  }

  let closeButton = modal.querySelector(".js-cookie-close");

  if (!window.localStorage.getItem(key)) {
    modal.classList.remove("hidden");
  }

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.localStorage.setItem(key, true);
  });
})();

"use strict";
(function () {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  if (!dropdowns.length) return;

  document.addEventListener("click", (el) => {
    const clicked = el
      .composedPath()
      .find((value) => value?.classList?.contains("js-dropdown-trigger"));

    if (!clicked) {
      clear();
    }
  });

  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".js-dropdown-trigger");

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  });

  function clear() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
  }
})();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.nextElementSibling;
      if (!content) return;
      target.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
})();

"use strict";
(async function () {
  let peopleSlider = null;
  const locations = [
    {
      name: "Тверская",
      value: "tverskaya",
      coords: [37.605822, 55.765412],
      content: [
        "Степ-аэробика",
        "Стритбаскет",
        "Сайклинг",
        "Батуты",
        "Полоса препятствий",
      ],
    },
    {
      name: "Камергерский переулок",
      value: "kamergersky",
      coords: [55.759932, 37.613593].reverse(),
      content: [
        "Воркаут",
        "Паркур",
        "Живые шахматы",
        "Мини-батуты ",
        "Фан-встречи",
      ],
    },
    {
      name: "Арбат",
      value: "arbat",
      coords: [55.749491, 37.591512].reverse(),
      content: [
        "Брейк-данс",
        "Рампа",
        "Силовой экстрим",
        "Армрестлинг",
        "Настольный хоккей",
        "Настольный футбол",
        "Гиревой спорт",
        "Настольный хоккей",
        "Танцевальная терапия",
      ],
    },
    {
      name: "Парк Горького",
      value: "gorky_park",
      coords: [55.731465, 37.603427].reverse(),
      content: ["TRX-тренировка", "Тренировка в гамаках", "Гидрофлай"],
    },
  ];

  const tabs = document.querySelectorAll(".js-tab");
  const tabsContent = document.querySelectorAll(".js-tabs-content");
  const actions = document.querySelectorAll(".js-tab-item");

  mountLegend();
  initTabs();
  initActions();

  function mountLegend() {
    const legendWrapper = document.querySelector(".js-legend-wrapper");
    const legend = document.createElement("div");
    legend.className = "map-night__legend js-legend";
    legend.dir = "rtl";
    legendWrapper.appendChild(legend);

    locations.forEach((location, index) => {
      // Prepare Item
      const legendItem = document.createElement("div");
      legendItem.className = "map-night__legend-item js-legend-item";
      legendItem.dataset.thumbName = location.value;
      legendItem.dir = "ltr";

      // Prepare Digit
      const legendDigit = document.createElement("div");
      legendDigit.className = "map-night__legend-digit";
      legendDigit.innerText = index + 1;

      //Prepare Content
      const legendItemContent = document.createElement("div");
      legendItemContent.className = "map-night__legend-content";

      //Prepare Title
      const legendItemTitle = document.createElement("div");
      legendItemTitle.className = "map-night__legend-title";
      legendItemTitle.innerText = location.name;

      //Prepare List
      const legendItemList = document.createElement("ul");
      legendItemList.className = "map-night__legend-items";
      location.content.forEach((content) => {
        const legendItemListItem = document.createElement("li");
        legendItemListItem.innerText = content;
        legendItemList.appendChild(legendItemListItem);
      });

      //Prepase button
      const legendItemButton = document.createElement("a");
      legendItemButton.className = "map-night__legend-more js-legend-link";
      legendItemButton.href = "#locations";
      legendItemButton.dataset.thumbName = location.value;
      legendItemButton.setAttribute("data-scroll", "");
      legendItemButton.innerText = "Расписание";

      // Appends
      legendItem.appendChild(legendDigit);
      legendItemContent.appendChild(legendItemTitle);
      legendItemContent.appendChild(legendItemList);
      legendItemContent.appendChild(legendItemButton);

      legendItem.appendChild(legendItemContent);
      legend.appendChild(legendItem);
    });
  }

  function initTabs() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const name = tab.dataset.tab;
        setTab(name);
      });
    });
  }

  function initActions() {
    actions.forEach((action) => {
      const toggler = action.querySelector(".js-tab-item-toggler");
      toggler.addEventListener("click", () => {
        const isOpened = action.classList.contains("is-item-active");
        action.classList.toggle("is-item-active");
        console.log("peopleSlider", peopleSlider);

        if (
          toggler.classList.contains("js-item-with-slider") &&
          !isOpened &&
          !peopleSlider
        ) {
          initSlider();
        }
      });
    });
  }

  function clearTabs() {
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });
    tabsContent.forEach((tab) => {
      tab.classList.remove("is-active");
    });
  }

  function setTab(name) {
    clearTabs();
    const targetTab = document.querySelector(`.js-tab[data-tab="${name}"]`);
    const targetTabContent = document.querySelector(
      `.js-tabs-content[data-tab="${name}"]`,
    );
    targetTabContent.classList.add("is-active");
    targetTab.classList.add("is-active");
  }

  function clearActions() {
    actions.forEach((action) => {
      action.classList.remove("is-item-active");
    });
  }

  //map constants
  const legend = document.querySelector(".js-legend");
  const activeString = "is-active";
  if (!legend) return;

  const legendItems = legend.querySelectorAll(".js-legend-item");
  const legendLinks = legend.querySelectorAll(".js-legend-link");

  const mapInstance = await initMap();

  legendItems.forEach((item) => {
    item.addEventListener("click", () => {
      setActiveLegend(item.dataset.thumbName);
    });
  });

  legendLinks.forEach((item) => {
    item.addEventListener("click", () => {
      const itemName = item.dataset.thumbName;
      setActiveLocation(itemName);
    });
  });

  document.addEventListener("click", (el) => {
    const clicked = el
      .composedPath()
      .find((value) =>
        value?.classList?.contains("js-locations-dropdown-trigger"),
      );
  });

  function setActiveLegend(name) {
    clearLegendItems();
    const legendItem = Array.from(legendItems).find(
      (item) => item.dataset.thumbName === name,
    );
    const markers = document.querySelectorAll(".js-marker");

    const selectedMarker = Array.from(markers).find(
      (marker) => marker.dataset.thumbName === name,
    );

    clearMarkers();
    selectedMarker.classList.add("is-active");
    legendItem.classList.add(activeString);
    const selectedLocation = locations.find(
      (location) => location.value === name,
    );

    mapInstance.setLocation({
      center: selectedLocation.coords,
      zoom: 17,
      duration: 200, // Animation of moving map will take 200 milliseconds
      easing: "ease-in-out", // Animation easing function
    });
  }

  function clearLegendItems() {
    legendItems.forEach((item) => {
      item.classList.remove(activeString);
    });
  }

  function clearContents() {
    contentsEls.forEach((item) => {
      item.classList.remove(activeString);
    });
  }

  function setActiveLocation(name) {
    setTab(name);
  }

  async function initMap() {
    const vw = window.innerWidth;
    await ymaps3.ready;

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapMarker,
      YMapDefaultFeaturesLayer,
    } = ymaps3;

    const map = new YMap(
      document.querySelector(".js-map"),
      {
        location: {
          center: [37.618435, 55.74713],
          zoom: vw > 767 ? 13 : 12,
        },
        theme: "dark",
      },
      [
        // Add a map scheme layer
        new YMapDefaultSchemeLayer({}),
        // Add a layer of geo objects to display the markers
        new YMapDefaultFeaturesLayer({}),
      ],
    );

    locations.forEach((location, index) => {
      const markerElement = document.createElement("div");
      markerElement.className = "map-night__marker js-marker";
      markerElement.innerText = index + 1;
      markerElement.dataset.thumbName = location.value;

      const marker = new YMapMarker(
        {
          coordinates: location.coords,
          draggable: false,
          mapFollowsOnDrag: false,
        },
        markerElement,
      );

      map.addChild(marker);

      markerElement.addEventListener("click", () => {
        const legendItem = Array.from(legendItems).find(
          (item) => item.dataset.thumbName === location.value,
        );
        setActiveLegend(location.value);
        legend.scrollTop = findPosition(legendItem) - findPosition(legend);

        clearMarkers();

        markerElement.classList.add("is-active");

        map.setLocation({
          center: location.coords,
          zoom: 17,
          duration: 200, // Animation of moving map will take 200 milliseconds
          easing: "ease-in-out", // Animation easing function
        });
      });
    });

    return map;
  }

  function findPosition(obj) {
    let currenttop = 0;
    if (obj.offsetParent) {
      do {
        currenttop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return currenttop;
    }
  }

  function clearMarkers() {
    const markers = document.querySelectorAll(".js-marker");
    Array.from(markers).forEach((marker) => {
      marker.classList.remove("is-active");
    });
  }

  function initSlider() {
    const slider = document.querySelector(".js-people-slider");
    if (!slider) {
      return;
    }
    const vw = window.innerWidth;
    const wrapper = slider.querySelector(".swiper-wrapper");

    if (wrapper.childNodes.length > 3 && vw > 1024) {
      peopleSlider = new Swiper(`.js-people-slider`, {
        // Optional parameters
        slidesPerView: 3,
        spaceBetween: 41,
        initialSlide: 0,
        draggable: false,
        pagination: false,
        loop: false,
        navigation: {
          nextEl: ".js-people-slider-next",
          prevEl: ".js-people-slider-prev",
        },
      });
    } else {
      slider.classList.add("disabled");
    }
  }
})();

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

"use strict";
(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  })

  closeButton.addEventListener('click', () => {
    closeNav();
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    })
  })


  function closeNav() {
    nav.classList.remove('is-active');
  }


})();

"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
  });
})();
