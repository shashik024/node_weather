// const message = "Hello i am client side js";

// console.log(message);

// const fetchedDataPuzzle = fetch("http://puzzle.mead.io/puzzle ").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorLine = document.querySelector("#infoLine-1");
const weatherLive = document.querySelector("#infoLine-2");
const weatherImg = document.getElementsByClassName(".img");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  weatherLive.textContent = "Loading.......";
  errorLine.textContent = " ";

  // console.log(location);

  const fetchedWhetherData = fetch("/whether?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorLine.textContent = data.error;
        } else {
          errorLine.textContent = data.location;
          weatherLive.textContent = data.forecast;
          search.value = " ";
        }
      });
    }
  );
});
