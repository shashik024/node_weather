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

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  weatherLive.textContent = "Loading.......";

  // console.log(location);

  const fetchedWhetherData = fetch(
    "http://localhost:3000/whether?address=" + location
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorLine.textContent = data.error;
      } else {
        weatherLive.textContent = data.location + " " + data.forecast;
        // console.log(data.forecast);
      }
    });
  });
});
