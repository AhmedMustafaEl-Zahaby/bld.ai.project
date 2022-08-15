const makeCorse = document.querySelector(".courses");
const searchBox = document.querySelector("#search-button");
let corses = [];
searchBox.addEventListener("click", function (event) {
  event.preventDefault();
  reseting();
});
const searchText = document.querySelector(".search-input");
searchText.addEventListener("keyup", function (event) {
  reseting();
});
function reseting() {
  let buff = [];
  buff = finding(searchText.value);
  makeCorse.innerHTML = "";
  for (let i = 0; i < corses.length; i++) {
    rinder(buff[i]);
  }
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
fetch("courses.json")
  .then((response) => {
    return response.json();
  })
  .then((a) => {
    corses = a;
    for (let i = 0; i < a.length; i++) {
      rinder(a[i]);
    }
  });
function rinder(corse) {
  const makeDiv = document.createElement("div");
  makeDiv.classList.add("course");
  const Img = document.createElement("img");
  Img.classList.add("course-image");
  Img.setAttribute("src", corse["image"]);
  const head = document.createElement("h4");
  head.innerText = corse["title"];
  const parag = document.createElement("p");
  parag.innerText = corse["author"];
  const rate = document.createElement("span");
  rate.classList.add("rate");
  rate.innerText = corse["rating"];
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
  price.innerText = corse["price"];
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
  makeCorse.appendChild(makeDiv);
}
