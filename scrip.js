const searchBox = document.querySelector("#search-button");
const selectCourses = document.querySelectorAll(".courses-container li");
const coursesContainer = document.querySelector(".outer-box");
const searchText = document.querySelector(".search-input");
let corses = [];
[...selectCourses].forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    fetchFromLink(link);
    document.querySelector(".search-input").value = "";
  });
});
searchText.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (searchText.value == "") {
    coursesContainer.removeChild(document.querySelector(".swiper"));
    reseting();
  }
});
Displaying(selectCourses[0]);
fetchFromLink(selectCourses[0]);
function Displaying(selectedList) {
  [...selectCourses].forEach(function (link) {
    link.classList.remove("selected");
  });
  selectedList.classList.add("selected");
}
function fetchFromLink(link) {
  fetch(link.getAttribute("href"))
    .then((response) => {
      return response.json();
    })
    .then(function (container) {
      corses = container["courses"];
      return container;
    })
    .then(function (continer) {
      showingDescription(continer);
      console.log(corses);
      return link;
    })
    .then((link) => Displaying(link));
}
function showingDescription(container) {
  coursesContainer.innerHTML = "";
  const Title = document.createElement("h2");
  Title.classList.add("h-3");
  const Paragraph = document.createElement("p");
  const Button = document.createElement("button");
  Button.classList.add("explore-button", "login-button");
  Title.innerHTML = container["sectionTitle"];
  Paragraph.innerHTML = container["courseDesc"];
  Button.innerHTML = "Explore " + container["courseName"];
  coursesContainer.appendChild(Title);
  coursesContainer.appendChild(Paragraph);
  coursesContainer.appendChild(Button);
  reseting();
}
searchBox.addEventListener("click", function (event) {
  event.preventDefault();
  coursesContainer.removeChild(document.querySelector(".swiper"));
  reseting();
});
function reseting() {
  let buff = [];
  buff = finding(searchText.value);
  console.log(buff);
  let courseContainer = document.createElement("div");
  courseContainer.classList.add("swiper-wrapper");
  for (let i = 0; i < buff.length; i++) {
    rinder(courseContainer, buff[i]);
  }
  swip = buildSwiper();
  swip.appendChild(courseContainer);
  var swiper = new Swiper(swip, {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 4,
    loop: false,
    loopFillGroupWithBlank: false,
    allowTouchMove: false,
    navigation: {
      nextEl: swip.querySelector(".swiper-button-next"),
      prevEl: swip.querySelector(".swiper-button-prev"),
    },
    breakpoints: {
      1280: {
        slidesPerView: 5,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      890: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
    },
  });
  coursesContainer.appendChild(swip);
}
function finding(searchText) {
  let buffring = [];
  if (searchText == "") {
    return corses;
  }
  for (let i = 0; i < corses.length; i++) {
    if (
      corses[i]["title"].toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    ) {
      buffring.push(corses[i]);
    }
  }
  return buffring;
}
function rinder(coursesContainer, corse) {
  const makeDiv = document.createElement("div");
  makeDiv.classList.add("course", "swiper-slide");
  const Img = document.createElement("img");
  Img.classList.add("course-image");
  Img.setAttribute("src", corse["image"]);
  const head = document.createElement("h5");
  head.classList.add("fw-bold");
  head.innerText = corse["title"];
  const parag = document.createElement("p");
  parag.innerText = corse["author"][0]["name"];
  const rate = document.createElement("span");
  rate.classList.add("rate");
  rate.innerText = +corse["rating"].toString().substr(0, 3);
  const star1 = document.createElement("i");
  const star2 = document.createElement("i");
  const star3 = document.createElement("i");
  const star4 = document.createElement("i");
  const star5 = document.createElement("i");
  star1.classList.add("fa-solid", "fa-star");
  star2.classList.add("fa-solid", "fa-star");
  star3.classList.add("fa-solid", "fa-star");
  star4.classList.add("fa-solid", "fa-star");
  star5.classList.add("fa-solid", "fa-star-half-stroke");
  const price = document.createElement("h4");
  price.classList.add("price");
  price.innerText = "E£" + corse["price"];
  console.log(makeDiv);
  makeDiv.appendChild(Img);
  makeDiv.appendChild(head);
  makeDiv.appendChild(parag);
  makeDiv.appendChild(rate);
  makeDiv.appendChild(star1);
  makeDiv.appendChild(star2);
  makeDiv.appendChild(star3);
  makeDiv.appendChild(star4);
  makeDiv.appendChild(star5);
  makeDiv.appendChild(price);
  coursesContainer.appendChild(makeDiv);
}
function buildSwiper() {
  let swipper = document.createElement("div");
  swipper.classList.add("swiper", "mySwiper", "mt-2");
  let nextButton = document.createElement("div");
  nextButton.classList.add("swiper-button-next");
  let prevButton = document.createElement("div");
  prevButton.classList.add("swiper-button-prev");
  swipper.appendChild(prevButton);
  swipper.appendChild(nextButton);
  return swipper;
}
