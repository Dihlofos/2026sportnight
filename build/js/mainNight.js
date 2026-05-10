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
    const spaceBetween = vw < 1025 ? 16 : 41;

    if (wrapper.childNodes.length > 3 && vw >= 768) {
      peopleSlider = new Swiper(`.js-people-slider`, {
        // Optional parameters
        slidesPerView: 3,
        spaceBetween,
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
