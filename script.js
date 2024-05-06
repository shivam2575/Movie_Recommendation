//Implement all your function here to make it a working application.
const selectEle = document.getElementById("genres");

const apiKey = "591da753e7622d693b4709d3c6ea53fe";
let generList = [];

//task 1: getting genres list
function getAllGenres(callbackfn) {
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );
  req.send();
  req.addEventListener("load", function () {
    const genresObj = JSON.parse(req.responseText);
    generList = [...genresObj.genres];
    console.log(generList);
    callbackfn();
  });
}

//task 1.1: add all genres to select element
function loadAllGenres() {
  generList.forEach((genre) => {
    const optionEle = document.createElement("option");
    optionEle.innerText = genre.name;
    console.log(genre);
    selectEle.appendChild(optionEle);
  });
}

//task 2: get all movies of selected genre

getAllGenres(loadAllGenres);
