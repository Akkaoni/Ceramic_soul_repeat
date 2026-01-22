import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import JustValidate from "just-validate";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "/src/sass/style.scss";

const burger = document.querySelector(".burger"),
  close = document.querySelector(".header__menu-close"),
  menu = document.querySelector(".header__menu");

// Сбрасываем состояние при загрузке страницы
window.addEventListener("load", () => {
  menu.classList.remove("header__menu_active");
  document.body.style.overflow = "";
});

burger.addEventListener("click", () => {
  menu.classList.add("header__menu_active");
  document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
  menu.classList.remove("header__menu_active");
  document.body.style.overflow = "";
});

try {
  new Swiper(".works__slider", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".icon-right-open",
      prevEl: ".icon-left-open",
    },
    breakpoints: {
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
    },
    modules: [Navigation, Pagination],
  });
} catch (e) {}

try {
  const tabs = document.querySelectorAll(".catalog__tab");
  const contents = document.querySelectorAll(".catalog__content-item");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      //удаляем активный класс у всех табов и контента
      tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
      contents.forEach((c) => (c.style.display = "none"));

      //добавляем актиыный класс к нажатому табу и показываем соответмтвующий контент
      tab.classList.add("catalog__tab_active");
      contents[index].style.display = "flex";
    });
  });

  //показывам первый контент при загрузке
  contents.forEach((c, i) => (c.style.display = i === 0 ? "flex" : "none"));
} catch (e) {}

try {
  const validator = new JustValidate("form");

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Please fill the name",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Min 2 chair!",
      },
    ])
    .addField("#email", [
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ])
    .addField(
      "#question",
      [
        {
          rule: "required",
        },
        {
          rule: "minLength",
          value: 5,
        },
      ],
      {
        errorsContainer: document
          .querySelector("#question")
          .parentElement.querySelector(".error-message"),
      },
    )
    .addField(
      "#checkbox",
      [
        {
          rule: "required",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#checkbox")
          .parentElement.parentElement.querySelector(".checkbox-error-message"),
      },
    )
    .onSuccess((event) => {
      const form = event.currentTarget;
      const formData = new FormData(form);

      fetch("", {
        method: "POST",
        body: formData,
      });
    });
} catch (e) {}

try {
  const validatorFooter = new JustValidate(".footer_f");
  validatorFooter
    .addField(
      "#e-mail",
      [
        {
          rule: "required",
        },
        {
          rule: "email",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#e-mail")
          .parentElement.querySelector(".email__error_masage"),
      },
    )
    .addField(
      "#footer-checkbox",
      [
        {
          rule: "required",
        },
      ],
      {
        errorsContainer: document
          .querySelector("#footer-checkbox")
          .parentElement.parentElement.querySelector(".check__error_masage"),
      },
    );
} catch (e) {}
