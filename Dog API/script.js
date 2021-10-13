const main = document.querySelector(".main-image");
const loader = document.querySelector(".loading-dog");
const breedSelect = document.getElementById("breed");

async function fillBreedList() {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");

  const resJson = await res.json();

  let breedList = Object.keys(resJson.message);

  let breedOptions = "<option> Pick a breed...</option>";

  for (let i = 0; i < breedList.length; i++) {
    breedOptions += `<option value=${breedList[i]}>${breedList[i]}</option>`;
  }

  breedSelect.innerHTML = breedOptions;
}
fillBreedList();

//first random breed image that shows up on page loading

async function firstRandomBreed() {
  const randomRes = await fetch("https://dog.ceo/api/breeds/image/random");

  const randomResJson = await randomRes.json();

  main.src = randomResJson.message;
}
firstRandomBreed();

// breed change event listeners

breedSelect.addEventListener("change", handleBreedChange);

main.addEventListener("load", function () {
  main.classList.add("show");
  loader.classList.remove("show");
});

async function handleBreedChange(event) {
  const breed = event.target.value;

  main.classList.remove("show");
  loader.classList.add("show");

  const res = await fetch(` https://dog.ceo/api/breed/${breed}/images/random`);
  const resJson = await res.json();

  main.src = resJson.message;
}
