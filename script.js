const main = document.querySelector("main")

const regularUser = document.querySelector(".regularUser");
const adminUser = document.querySelector("#admin");
const loginButton = document.querySelector(".loginButton");
const movieList = document.querySelector(".movieList");
const createNewMovieButton = document.querySelector("#createNewMovie");
const newMovieForm = document.querySelector("#newMovieForm");
const movieListContainer = document.querySelector(".movieListContainer");
const backToLoginButton = document.querySelector("#backToLogin");

const seats = 8

loginButton.addEventListener("click", () => {

    movieList.classList.remove("hidden");
    main.classList.add("hidden");
});

createNewMovieButton.addEventListener("click", () => {
    newMovieForm.classList.toggle("hidden");
});

backToLoginButton.addEventListener("click", () => {
    movieList.classList.add("hidden");
    newMovieForm.classList.add("hidden");
    main.classList.remove("hidden");
});

newMovieForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#movieTitle").value;
    const image = document.querySelector("#movieImage").value;
    const seats = document.querySelector("#seatsTotal").value;

    addMovie(title, image, seats);
    saveMovieToLocalStorage(title, image, seats);
    newMovieForm.reset();
    newMovieForm.classList.add("hidden");
});

function addMovie(title, image, seats) {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movieItem");

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = title;

    const movieImage = document.createElement("img");
    movieImage.src = image;
    movieImage.alt = title;

    const movieSeats = document.createElement("p");
    movieSeats.textContent = `Total seats: ${seats}`
    movieSeats.classList.add("movieSeatsClick")

    movieSeats.addEventListener("click", () => {
        window.location.href = "singleMoviePage.html";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => {
        movieItem.remove();
        removeMovieFromLocalStorage(title);
    });


    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieSeats);
    movieItem.appendChild(deleteButton);

    movieListContainer.appendChild(movieItem);
}

function saveMovieToLocalStorage(title, image, seats) {
    let movies = localStorage.getItem("movies");
    if (!movies) {
        movies = [];
    } else {
        movies = JSON.parse(movies);
    }
    movies.push({title, image, seats});
    localStorage.setItem("movies", JSON.stringify(movies));
}

function removeMovieFromLocalStorage(title) {
    let movies = localStorage.getItem("movies");
    if (movies) {
        movies = JSON.parse(movies);
        movies = movies.filter(movie => movie.title !== title);
        localStorage.setItem("movies", JSON.stringify(movies));
    }
}

function loadMoviesFromLocalStorage() {
    const movies = localStorage.getItem("movies");
    if (movies) {
        JSON.parse(movies).forEach(movie => {
            addMovie(movie.title, movie.image, movie.seats);
        });
    }
}

loadMoviesFromLocalStorage();
