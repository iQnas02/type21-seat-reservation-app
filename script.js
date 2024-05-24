
const main = document.querySelector("main")

const regularUser = document.querySelector(".regularUser");
const adminUser = document.querySelector("#admin");
const movieList = document.querySelector(".movieList");
const createNewMovieButton = document.querySelector("#createNewMovie");
const newMovieForm = document.querySelector("#newMovieForm");
const movieListContainer = document.querySelector(".movieListContainer");
const backToLoginButton = document.querySelector("#backToLogin");


const seats = 0;
let currentUser = "";



regularUser.addEventListener("click", () => {
    regularUser.classList.add("selected");
    adminUser.classList.remove("selected");
    currentUser= "regular";
    movieList.classList.remove("hidden");
    main.classList.add("hidden");
    createNewMovieButton.classList.add("hidden")
    hideDeleteButtons();
    loadMoviesFromLocalStorage();
});
adminUser.addEventListener("click", () => {
    adminUser.classList.add("selected");
    regularUser.classList.remove("selected");
    currentUser = "admin";
    movieList.classList.remove("hidden");
    createNewMovieButton.classList.remove("hidden")
    createNewMovieButton.style.display = "block";
    main.classList.add("hidden");
    showDeleteButtons();
    loadMoviesFromLocalStorage();
})
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
    if (currentUser ==="admin") {
        newMovieForm.classList.remove("hidden");
        movieListContainer.classList.remove("hidden");
        movieListContainer.style.display= "block"
    }
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
    const movieItem = document.createElement("div1");
    movieItem.classList.add("movieItem1");

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = title;

    const movieImage = document.createElement("img");
    movieImage.src = image;
    movieImage.alt = title;

    const movieSeats = document.createElement("p");
    movieSeats.textContent = `🆕Total seats: ${seats}`
    movieSeats.classList.add("movieSeatsClick")

    movieSeats.addEventListener("click", () => {
        window.location.href = "singleMoviePage.html";
    });
    console.log("Current User:", currentUser); // Add this line for debugging

    if (currentUser === "admin") {
        console.log("Adding delete button for admin"); // Add this line for debugging

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "deleteButton");        deleteButton.addEventListener("click", () => {
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
if (currentUser=== "regular"){
    createNewMovieButton.style.display = "none";
}
