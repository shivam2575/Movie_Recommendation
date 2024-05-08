//Implement all your function here to make it a working application.
const selectEle = document.getElementById("genres");
const searchBtnEle = document.getElementById("playBtn");
const movieInfoEle = document.getElementById("movieInfo");
const moviePosterEle = document.getElementById("moviePoster");
const movieTextEle = document.getElementById("movieText");
const nextBtnContainerEle = document.getElementById("likeOrDislikeBtns");
const nextBtnEle = document.getElementById("likeBtn");

const apiKey = "591da753e7622d693b4709d3c6ea53fe";
let generList = [];
let movieList = [];

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
    optionEle.value = genre.id;
    console.log(genre);
    selectEle.appendChild(optionEle);
  });
}

function getAllMovies() {
  const genre = selectEle.value;
  //   get all the movies of selected genre
  const req1 = new XMLHttpRequest();
  req1.open(
    "GET",
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`
  );
  req1.send();
  req1.addEventListener("load", function () {
    const moviesObj = JSON.parse(req1.responseText);
    console.log(moviesObj);
    movieList = [...moviesObj.results];
    console.log(movieList);
    displayMovie();
  });
}

function displayMovie() {
  let randomIndex = Math.floor(Math.random() * movieList.length);
  const currMovie = movieList[randomIndex];
  const posterEle = document.createElement("img");
  const movieTitleEle = document.createElement("h2");
  movieTitleEle.setAttribute("id", "movieTitle");
  const movieOverviewEle = document.createElement("p");
  movieOverviewEle.setAttribute("id", "movieOverview");
  movieTitleEle.innerText = currMovie.original_title;
  movieOverviewEle.innerText = currMovie.overview;
  posterEle.src = `https://image.tmdb.org/t/p/w500${currMovie.poster_path}`;
  moviePosterEle.replaceChildren(posterEle);
  const existingMovieName = movieTextEle.querySelector("h2");
  if (existingMovieName) {
    movieTextEle.replaceChild(movieTitleEle, existingMovieName);
  } else {
    movieTextEle.appendChild(movieTitleEle);
  }

  const existingMovieOverview = movieTextEle.querySelector("p");
  if (existingMovieOverview) {
    movieTextEle.replaceChild(movieOverviewEle, existingMovieOverview);
  } else {
    movieTextEle.appendChild(movieOverviewEle);
  }
  nextBtnContainerEle.removeAttribute("hidden");
}

//task 2: get all movies of selected genre
getAllGenres(loadAllGenres);
searchBtnEle.addEventListener("click", getAllMovies);
nextBtnEle.addEventListener("click", displayMovie);
