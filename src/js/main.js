if (document.querySelector('.header')) {
  let reg = document.querySelector(".header__select");
  new Choices(reg, {
    searchEnabled: !1,
    itemSelectText: "",
    shouldSort: !1,
    classNames: {containerOuter: "choices choices__region", list: "choices__list--region", flippedState: ""}
  });
  let fil = document.querySelector(".header__filter");
  new Choices(fil, {
    searchEnabled: !1,
    itemSelectText: "",
    shouldSort: !1,
    classNames: {containerOuter: "choices choices__filter", list: "choices__list--filter", flippedState: ""}
  });
  const burger = document.querySelector('.burger-menu');
  const menu = document.querySelector('.bottom-menu');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    burger.classList.toggle('active');
  })
}


if (document.querySelector('.hero__slider')) {
  const swiperHero = new Swiper('.hero__slider', {
    autoplay: {delay: 4000},
    effect: "fade",
    fadeEffect: {crossFade: true},
    loop: true,
    pagination: {
      el: '.swiper-pagination-hero',
      clickable: true,
    },
  });
}

if (document.querySelector('.oferta__slider')) {
  const swiperOferta = new Swiper('.oferta__slider', {
    effect: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.oferta__button-next',
      prevEl: '.oferta__button-prev',
    },
    breakpoints: {
      501: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      993: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 33,
      },
      1311: {
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
    },
    a11y: false,
  });
}

if (document.querySelector('.special__slider')) {
  const swiperSpecial = new Swiper('.special__slider', {
    effect: 'horizontal',
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 32,
    navigation: {
      nextEl: '.special__button-next',
      prevEl: '.special__button-prev',
    },
    breakpoints: {
      501: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      993: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
      1311: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
    }
  });
}

let winWidth = window.screen.width; //Переменная отвечающая за ширину экрана

if (document.querySelector('.rating')) {
  const rating = document.querySelector('.rating');
  const cardDisplay = rating.querySelectorAll('.card__wrap');
  const btnRating = document.querySelector('.rating__btn');

  const resize = (a, b) => {
    winWidth = window.screen.width
    if (winWidth > 1309) {
      for (let i = 0; i < a.length; i++) {
        a[i].style.display = 'block';
        if (i > 7) {
          a[i].style.display = 'none';
          btnRating.style.display = 'block';
        }
      }
    } else {
      for (let i = 0; i < a.length; i++) {
        if (i > 5) {
          a[i].style.display = 'none';
          btnRating.style.display = 'block';
        }
      }
    }
    if (b) {
      for (let i = 0; i < a.length; i++) {
        a[i].style.display = 'block';
      }
      btnRating.style.display = 'none';
    }
  }
  resize(cardDisplay);
  window.addEventListener('resize', () => {
    resize(cardDisplay);
  });
  btnRating.addEventListener('click', (e) => {
    e.preventDefault();
    resize(cardDisplay, "click");
  })
}

(() => {
  tippy('.tooltip-js', {
    theme: 'project',
    maxWidth: 157,
    trigger: "mouseenter focus click",
    interactive: true,
  });
})()

if (document.querySelector("input[type='tel']")) {
  let selector = document.querySelector("input[type='tel']");
  let im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);
}

if (document.querySelector(".contact__input")) {
  let contactButtons = document.querySelector('.contact__btn');
  let contactSuccess = document.querySelectorAll('.contact__input');

  contactButtons.addEventListener('click', (function () {
    contactSuccess.forEach((function (inp) {
      return inp.classList.add('js-success')
    }))
  }))

  new JustValidate('.contact__form', {
    colorWrong: '#D11616',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 25
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Недопустимый формат",
        minLength: "Имя не может быть меньше двух символов",
        maxLength: "Запрещено вводить более 25 символов"
      },
      tel: {
        required: "Недопустимый формат",
        function: "Здесь должно быть 10 символов"
      },
      email: {
        required: "Недопустимый формат",
        email: "Email должен быть по примеру example@mail.ru"
      }
    },
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      thisForm.reset();
    }
  });
}

if (document.querySelector('.js-filter-price-options')) {
  const filterPriceFrom = document.querySelector('.js-filter-price-from');
  const filterPriceTo = document.querySelector('.js-filter-price-to')
  const filterPriceSlider = document.querySelector('.filter__range-slider')

  noUiSlider.create(filterPriceSlider, {
    start: [2000, 150000],
    connect: true,
    range: {
      min: 0,
      max: 200000,
    },
    step: 1,
    format: wNumb({
      decimals: 0,
      thousand: ' ',
    })
  })

  filterPriceSlider.noUiSlider.on('update', function (values, handle) {
    const value = values[handle]

    if (handle) {
      filterPriceTo.value = value
    } else {
      filterPriceFrom.value = value
    }
  })

  filterPriceFrom.addEventListener('change', () =>
    filterPriceSlider.noUiSlider.set([filterPriceFrom.value, null])
  )
  filterPriceTo.addEventListener('change', () =>
    filterPriceSlider.noUiSlider.set([null, filterPriceTo.value])
  )

  let filterParam = document.querySelectorAll('.filter__param');
  for (let i = 0; i < filterParam.length; i++) {
    let filterParamBtn = filterParam[i].querySelector('.filter__name');
    filterParamBtn.onclick = function (e) {
      e.preventDefault();
      if (filterParam[i].classList.contains('is-active')) {
        filterParam[i].classList.remove('is-active');
      } else {
        for (let i = 0; i < filterParam.length; i++) {
          filterParam[i].classList.remove('is-active');
        }
        filterParam[i].classList.add('is-active')
      }
    }
  }

  let tagList = document.querySelector('.catalog__filter-tag-list');
  let filterInputs = document.querySelectorAll('.custom--check');

  filterInputs.forEach(e => {
    e.addEventListener("change", t => {
      let name = t.target.nextElementSibling.textContent;
      let typeFilter = e.getAttribute('name');

      if (t.target.checked) {
        const liTag = document.createElement('li');
        liTag.classList.add('catalog__filter-tag-item');
        const spanTag = document.createElement('span');
        spanTag.textContent = name;
        spanTag.classList.add('catalog__tag');
        let colorTag;
        switch (typeFilter) {
          case "category":
            colorTag = "--color-green";
            break;
          case "price":
            colorTag = "--color-orange";
            break;
          case "discount":
            colorTag = "--color-violet";
            break;
          case "color":
            colorTag = "--color-grey";
            break;
        }
        spanTag.classList.add(`catalog__tag${colorTag}`);
        const btnCloseTag = document.createElement('button');
        btnCloseTag.classList.add('close-btn', 'catalog__tag-close-btn')
        btnCloseTag.addEventListener('click', () => {
          btnCloseTag.parentElement.parentElement.remove();
          e.checked = false;
        })
        const spanCloseTag = document.createElement('span');

        btnCloseTag.append(spanCloseTag)
        spanTag.append(btnCloseTag);
        liTag.append(spanTag)
        tagList.append(liTag);
      } else {
        tagList.querySelectorAll('.catalog__tag').forEach(e => {
          e.textContent === name && e.parentElement.remove()
        })
      }
    })
  })
}

if (document.querySelector('.card__list--catalog')) {
  const cardCatalog = document.querySelector('.card__list--catalog');
  const cardItem = cardCatalog.querySelectorAll('.card__wrap');

  let paginationLimit, firsPaginationLimit = 0;
  paginationLimitToWidth()

  function paginationLimitToWidth() {
    if (winWidth > 992) {
      paginationLimit = 9;
    } else {
      paginationLimit = 6;
    }
  }

  window.addEventListener('resize', () => {
    winWidth = window.screen.width
    paginationLimitToWidth()
  });

  for (let i = firsPaginationLimit; i < cardItem.length; i++) {
    let a = cardItem[i]
    if (i < paginationLimit) {
      a.style.display = 'block';
    } else {
      a.style.display = 'none';
    }
  }

  let containerCatalogPagination = document.querySelector('.pagination__list');
  let numberPagination;

  function createPaginationBtn(data) {
    let liPagination = document.createElement('li');
    liPagination.classList.add('pagination__item');
    let btnPagination = document.createElement('button');
    btnPagination.classList.add('pagination__link');
    btnPagination.textContent = data;
    btnPagination.setAttribute('value', data);
    btnPagination.onclick = function (e) {
      e.preventDefault();
      clickFunctionTab(data);
      btnPagination.classList.add('active');
    }
    containerCatalogPagination.append(liPagination);
    liPagination.append(btnPagination);
  }

  for (let i = 0; i < cardItem.length / paginationLimit; i++) {
    numberPagination = i + 1
    createPaginationBtn(numberPagination);
  }

  let allBtn = containerCatalogPagination.querySelectorAll('button');

  function firstLoad() {
    for (let i = 0; i < allBtn.length; i++) {
      if (allBtn[i].getAttribute('value') === '1') {
        allBtn[i].classList.add('active');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', firstLoad);

  function clickFunctionTab(data) {
    if (data === 1) {
      catalogCardVisible(firsPaginationLimit, paginationLimit)
    } else if (data === 2) {
      catalogCardVisible(paginationLimit, (paginationLimit * data))
    } else if (data >= 3) {
      catalogCardVisible((paginationLimit * (data - 1)), (paginationLimit * data))
    }
    let btnPaginationSearch = document.querySelectorAll('.pagination__link');
    for (let i = 0; i < btnPaginationSearch.length; i++) {
      btnPaginationSearch[i].classList.remove('active');
    }
  }

  function catalogCardVisible(a, b) {
    for (let i = 0; i < cardItem.length; i++) {
      cardItem[i].style.display = 'none';
    }
    for (let i = a; i < cardItem.length; i++) {
      if (i < b) {
        cardItem[i].style.display = 'block';
      }
    }
  }
}

if (document.querySelector('.product')) {
  const thumbsSlider = new Swiper('.product__thumbs', {
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    freeMode: true,
    watchSlidesProgress: true,
    a11y: {
      slideLabelMessage: 'Миниатюра фото товара {{index}} из {{slidesLength}}',
      prevSlideMessage: 'Предыдущие миниатюры',
      nextSlideMessage: 'Следующие миниатюры',
    },
    direction: 'horizontal',
    spaceBetween: 40,
    breakpoints: {
      501: {
        spaceBetween: 17,
        direction: 'vertical',
      },
      993: {
        spaceBetween: 18,
        direction: 'horizontal',
      },
      1311: {
        spaceBetween: 38,
        direction: 'horizontal',
      },
    },
  });

  new Swiper('.product__photo', {
    spaceBetween: 16,
    thumbs: {
      swiper: thumbsSlider,
    },
    a11y: {
      slideLabelMessage: 'Фото товара {{index}} из {{slidesLength}}',
      prevSlideMessage: 'Предыдущее фото',
      nextSlideMessage: 'Следующее фото',
    },
  })

  const productPhoto = document.querySelector('.product__photo');
  const closeModal = document.querySelector('.modal__close-btn');
  const modalShadowWindow = document.querySelector('.modal');
  const modalContainerPhoto = document.querySelector('.modal__container--photo');
  const photoWindow = document.querySelector('.modal__window--photo');

  productPhoto.addEventListener('click', () => {
    console.log('click to photo');
    modalShadowWindow.classList.add('show');
    photoWindow.classList.add('show');
  });

  const thumbsSliderModal = new Swiper('.modal__thumbs-product', {
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    freeMode: true,
    watchSlidesProgress: true,
    a11y: {
      slideLabelMessage: 'Миниатюра фото товара {{index}} из {{slidesLength}}',
      prevSlideMessage: 'Предыдущие миниатюры',
      nextSlideMessage: 'Следующие миниатюры',
    },
    direction: 'horizontal',
    spaceBetween: 40,
    breakpoints: {
      501: {
        spaceBetween: 10,
        direction: 'horizontal',
        slidesPerView: 2,
      },
      993: {
        spaceBetween: 18,
        direction: 'horizontal',
        slidesPerView: 3,
      },
      1311: {
        spaceBetween: 38,
        direction: 'horizontal',
        slidesPerView: 4,
      },
    },
  });

  new Swiper('.modal__photo-product', {
    spaceBetween: 16,
    thumbs: {
      swiper: thumbsSliderModal,
    },
    a11y: {
      slideLabelMessage: 'Фото товара {{index}} из {{slidesLength}}',
      prevSlideMessage: 'Предыдущее фото',
      nextSlideMessage: 'Следующее фото',
    },
  })
}

if (document.querySelector('.alike')) {
  const swiperSpecial = new Swiper('.alike__slider', {
    effect: 'horizontal',
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 16,
    navigation: {
      nextEl: '.alike__button-next',
      prevEl: '.alike__button-prev',
    },
    breakpoints: {
      501: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
      },
      993: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
      1311: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 32,
      },
    }
  });
}
if (document.querySelector('.product__btn-sail')) {
  const productBtnSail = document.querySelector('.product__btn-sail');
  const buyWindow = document.querySelector('.modal__window--buy');
  const successWindow = document.querySelector('.modal__window--success');
  const modalShadowWindow = document.querySelector('.modal');
  const closeModal = document.querySelectorAll('.modal__close-btn');
  const modalContainerBuy = document.querySelector('.modal__container--buy');
  const modalContainerSuccess = document.querySelector('.modal__container--success');

  productBtnSail.addEventListener('click', (e) => {
    e.preventDefault();
    modalShadowWindow.classList.add('show');
    buyWindow.classList.add('show');
    modalContainerBuy.classList.add('show');
  });

  for(let i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', () => {
      modalShadowWindow.classList.remove('show');
      buyWindow.classList.remove('show');
      modalContainerBuy.classList.remove('show');
      modalContainerSuccess.classList.remove('show');
    });
  }

  const selector = document.querySelector("input[type='tel']")

  new JustValidate('.modal__form', {
    colorWrong: '#D11616',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 25
      },
      tel: {
        required: true,
        function: (name, value) => {

          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },
    messages: {
      name: {
        required: "Недопустимый формат",
        minLength: "Имя не может быть меньше двух символов",
        maxLength: "Запрещено вводить более 25 символов"
      },
      tel: {
        required: "Недопустимый формат",
        function: "Здесь должно быть 10 символов"
      },
    },
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
            modalContainerBuy.classList.remove('show');
            buyWindow.classList.remove('show');
            modalContainerSuccess.classList.add('show');
            successWindow.classList.add('show');
          }
        }
      }
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      thisForm.reset();
    }
  });
}
