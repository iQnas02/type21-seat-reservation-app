export function addMovie(title, image, seats, onClickCallback) {
    const movieListContainer = document.querySelector(".movieListContainer");
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

    movieSeats.addEventListener("click", () => onClickCallback(title, seats));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "adminOnly");
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

export function saveMovieToLocalStorage(title, image, seats) {
    let movies = localStorage.getItem("movies");
    if (!movies) {
        movies = [];
    } else {
        movies = JSON.parse(movies);
    }
    movies.push({ title, image, seats });
    localStorage.setItem("movies", JSON.stringify(movies));
}

export function removeMovieFromLocalStorage(title) {
    let movies = localStorage.getItem("movies");
    if (movies) {
        movies = JSON.parse(movies);
        movies = movies.filter(movie => movie.title !== title);
        localStorage.setItem("movies", JSON.stringify(movies));
    }
}

export function loadMoviesFromLocalStorage(onClickCallback) {
    const movies = localStorage.getItem("movies");
    if (movies) {
        JSON.parse(movies).forEach(movie => {
            addMovie(movie.title, movie.image, movie.seats, onClickCallback);
        });
    }
}
