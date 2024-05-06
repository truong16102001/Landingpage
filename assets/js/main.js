// typed js
var typedOptions = {
  strings: ["Hi, I'm Chao", "Welcome!"],
  typeSpeed: 100,
  loop: true,
  loopCount: Infinity,
  backDelay: 2000,
};

var typed = new Typed("#hero-titles", typedOptions);

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 50
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".product__container", {
  spaceBetween: 35,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // 640: {
    //   slidesPerView: 2,
    //   spaceBetween: 20,
    // },
    // 768: {
    //   slidesPerView: 4,
    //   spaceBetween: 40,
    // },
    1024: {
      slidesPerView: 4,
      spaceBetween: 72,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset :true
});

sr.reveal(
  `.home__data, .products__container, .footer__container, .footer__info`
);
sr.reveal(`.home__images`, { delay: 600, origin: "bottom" });
sr.reveal(`.new_card, .brand__img`, { interval: 100 });
sr.reveal(`.collection__explore:nth-child(1)`, { origin: "right" });
sr.reveal(`.collection__explore:nth-child(2)`, { origin: "left" });

// send message to google sheet
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Ngăn chặn sự kiện mặc định của form

  // Lấy dữ liệu từ các trường input
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Kiểm tra xem các trường đã được điền đầy đủ hay không
  if (name && email && phone) {
    const data = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };
    postData(data);
  } else {
    alert("Please fill all of required input fields");
  }
});

async function postData(data) {
  const formData = new FormData();
  formData.append("entry.622284216", data.name);
  formData.append("entry.1912154255", data.email);
  formData.append("entry.2027738941", data.phone);
  formData.append("entry.2029031814", data.message);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSdnyyfRuUDS791GEjpzilc69vAvyW6jDI4nFlPosyHSz2qu_A/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );

  window.location.href = "/";
}
