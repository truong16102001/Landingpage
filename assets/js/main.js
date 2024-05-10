// typed js
var typedOptions = {
  strings: ["Hi, I'm Elite", "Welcome!"],
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

// register Customize
const btnRegisterCustomize = document.getElementById("btnRegisterCustomize");
btnRegisterCustomize.addEventListener("click", () => {
  // Lấy dữ liệu từ các trường input
  const name = document.getElementById("rcCustomerName").value;
  const email = document.getElementById("rcCustomerEmail").value;
  const phone = document.getElementById("rcCustomerPhone").value;
  const customizes = [];
  const checkboxes = document.querySelectorAll("input[name=customize]:checked");
  checkboxes.forEach((checkbox) => {
    customizes.push("- " + checkbox.value);
  });

  // Kiểm tra xem các trường đã được điền đầy đủ hay không
  if (name && email && phone && customizes.length > 0) {
    const data = {
      name: name,
      email: email,
      phone: phone,
      customizes: customizes.join("\n"),
    };
    postDataCustomize(data);
  } else {
    alert("Please fill all of required input fields");
  }
});

async function postDataCustomize(data) {
  const formData = new FormData();
  formData.append("entry.2104221524", data.name);
  formData.append("entry.1709008458", data.email);
  formData.append("entry.1546989333", data.phone);
  formData.append("entry.98865928", data.customizes);
  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLScA59NfFGh3-FoljzT0zFnpoDhpNznEb1-cVXyDU6vdCRrD2g/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );

  window.location.href = "/";
}

// register Insurance
const btnRegisterInsurance = document.getElementById("btnRegisterInsurance");
btnRegisterInsurance.addEventListener("click", () => {
  // Lấy dữ liệu từ các trường input
  const name = document.getElementById("riCustomerName").value;
  const phone = document.getElementById("riCustomerPhone").value;
  const warrantyCode = document.getElementById("insuranceCard").value;
  const issue = document.getElementById("issueDescription").value;

  // Kiểm tra xem các trường đã được điền đầy đủ hay không
  if (name && phone && warrantyCode) {
    const data = {
      name: name,
      phone: phone,
      warrantyCode: warrantyCode,
      issue: issue,
    };
    postDataInsurance(data);
  } else {
    alert("Please fill all of required input fields");
  }
});

async function postDataInsurance(data) {
  const formData = new FormData();
  formData.append("entry.431012347", data.name);
  formData.append("entry.1267840880", data.phone);
  formData.append("entry.1106932096", data.warrantyCode);
  formData.append("entry.602237901", data.issue);
  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSce6t6SgcgdM9gBZHxTMn3w3SinWKdBfufFlol8yb1GV3046w/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );

  window.location.href = "/";
}

// contact form submit
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Ngăn chặn sự kiện mặc định của form

  // Lấy dữ liệu từ các trường input
  const name = document.getElementById("ctname").value;
  const email = document.getElementById("ctemail").value;
  const phone = document.getElementById("ctphone").value;
  const message = document.getElementById("ctmessage").value;

  // Kiểm tra xem các trường đã được điền đầy đủ hay không
  if (name && email && phone) {
    const data = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };
    postDataContact(data);
  } else {
    alert("Please fill all of required input fields");
  }
});

async function postDataContact(data) {
  const formData = new FormData();
  formData.append("entry.2055079637", data.name);
  formData.append("entry.1732830301", data.email);
  formData.append("entry.1824102721", data.phone);
  formData.append("entry.1122189729", data.message);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSch_dkFoWPflOGfLZ3GW7WgCVu064JVk-AiUSAWieRPVMyZ6g/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );

  window.location.href = "/";
}

//buy
var btnInsert = document.getElementById("btnInsert");
btnInsert.addEventListener("click", () => {
  // Lấy giá trị của các trường nhập liệu
  const customerName = document.getElementById("buyCustomerName").value.trim();
  const customerPhone = document
    .getElementById("buyCustomerPhone")
    .value.trim();
  const address = document.getElementById("buyAddress").value.trim();
  const email = document.getElementById("buyCustomerEmail").value.trim();
  const buyProductName = document
    .getElementById("buyProductName")
    .innerText.trim();
  const size = document.querySelector("input[name=size]:checked");
  const buyProductUnitPrice = document
    .getElementById("buyProductUnitPrice")
    .innerText.trim();
  const buyQuantity = document.getElementById("buyQuantity").value.trim();
  const note = document.getElementById("buyNote").value.trim();

  const buyTotalPrice = document
    .getElementById("buyTotalPrice")
    .innerText.trim();

  if (customerName && customerPhone && email && address) {
    const data = {
      customerName: customerName,
      email: email,
      customerPhone: customerPhone,
      buyProductName: buyProductName,
      size: size,
      buyProductUnitPrice : buyProductUnitPrice,
      buyQuantity: buyQuantity,
      buyTotalPrice: buyTotalPrice,
      address: address,
      note: note,
    };
    postDataBuy(data);
  } else {
    alert("Please fill all of required input fields");
  }
});

async function postDataBuy(data) {
  const formData = new FormData();
  formData.append("entry.1496038398", data.customerName);
  formData.append("entry.1843664615", data.email);
  formData.append("entry.997279394", data.customerPhone);
  formData.append("entry.951268168", data.buyProductName);
  formData.append("entry.306339524", data.size.value);
  formData.append("entry.1244635963", data.buyProductUnitPrice);
  formData.append("entry.878237130", data.buyQuantity);
  formData.append("entry.1388097074", data.buyTotalPrice);
  formData.append("entry.1816794654", data.address);
  formData.append("entry.1681591743", data.note);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSdrNmTWyl7bizrS57CllJD4JUtG-OnxcV9tIAWbd3yUKjJBsw/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );

  window.location.href = "/";
}