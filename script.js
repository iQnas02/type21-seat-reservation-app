import {initializeSingleMoviePage} from './singleMoviePage.js';

const main = document.querySelector("main");
const regularUser = document.querySelector(".regularUser");
const adminUser = document.querySelector("#admin");
const movieList = document.querySelector(".movieList");
const createNewMovieButton = document.querySelector("#createNewMovie");
const newMovieForm = document.querySelector("#newMovieForm");
const movieListContainer = document.querySelector(".movieListContainer");
const backToLoginButton = document.querySelector("#backToLogin");
const errorMessage = document.querySelector("#errorMessage"); // Error message element
const backToMovieList = document.querySelector(".backToMovieList");
const singleMoviePage = document.querySelector(".mainMoviePage");

let currentUser = "";


// Event listeners for user role selection
regularUser.addEventListener("click", () => {
    regularUser.classList.add("selected");
    adminUser.classList.remove("selected");
    currentUser = "regular";
    movieList.classList.remove("hidden");
    main.classList.add("hidden");
    createNewMovieButton.classList.add("hidden");
    createNewMovieButton.style.display = "none";
    hideDeleteButtons();
    loadMoviesFromLocalStorage();
});

adminUser.addEventListener("click", () => {
    adminUser.classList.add("selected");
    regularUser.classList.remove("selected");
    currentUser = "admin";
    movieList.classList.remove("hidden");
    createNewMovieButton.classList.remove("hidden");
    createNewMovieButton.style.display = "block";
    main.classList.add("hidden");
    showDeleteButtons();
    loadMoviesFromLocalStorage();
});

function showDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(button => {
        button.style.display = "inline-block";
    });
}

function hideDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(button => {
        button.style.display = "none";
    });
}

createNewMovieButton.addEventListener("click", () => {
    if (currentUser === "admin") {

        newMovieForm.classList.remove("hidden");
        movieListContainer.classList.remove("hidden");
        movieListContainer.style.display = "block";
    }


});

backToLoginButton.addEventListener("click", () => {
    movieList.classList.add("hidden");
    newMovieForm.classList.add("hidden");
    main.classList.remove("hidden");
});

if (backToMovieList) {
    backToMovieList.addEventListener("click", () => {
        singleMoviePage.style.display = "none"
        newMovieForm.classList.add("hidden");
        main.classList.add("hidden");
        movieList.classList.remove("hidden");
    })
}

newMovieForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#movieTitle").value;
    const image = document.querySelector("#movieImage").value;
    const seats = parseInt(document.querySelector("#seatsTotal").value, 10);

    if (seats < 1 || seats > 50) {
        errorMessage.textContent = "Total seats must be between 1 and 50.";
        return;
    }

    errorMessage.textContent = ""; // Clear error message

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
    movieSeats.textContent = `Total seats: ${seats}`;
    movieSeats.classList.add("movieSeatsClick");

    movieSeats.addEventListener("click", () => {
        initializeSingleMoviePage(currentUser === "admin", title, image, seats);

    });

    if (currentUser === "admin") {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "deleteButton");
        deleteButton.addEventListener("click", () => {
            movieItem.remove();
            removeMovieFromLocalStorage(title);
        });

        movieItem.appendChild(deleteButton);
    }

    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieSeats);

    movieListContainer.appendChild(movieItem);
}

movieListContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("movieSeatsClick")) {
        const movieItem = event.target.closest(".movieItem");
        const title = movieItem.querySelector("h3").textContent;
        const image = movieItem.querySelector("img").src;
        const seats = parseInt(movieItem.querySelector("p").textContent.replace("Total seats: ", ""), 10);

        initializeSingleMoviePage(currentUser === "admin", title, image, seats);
        const singleMoviePage = document.querySelector(".mainMoviePage");

        singleMoviePage.classList.remove("hidden");
        singleMoviePage.style.display = "block";
        movieList.classList.add("hidden");
    }
});

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
    clearMovieList();
    const movies = localStorage.getItem("movies");
    if (movies) {
        JSON.parse(movies).forEach(movie => {
            addMovie(movie.title, movie.image, movie.seats);
        });
    }
}

function clearMovieList() {
    movieListContainer.innerHTML = "";
}

loadMoviesFromLocalStorage();


