export function initializeSingleMoviePage(isAdmin, title, image, totalSeats) {
    const singleMoviePage = document.querySelector(".mainMoviePage");
    const movieList = document.querySelector(".movieList");

    singleMoviePage.classList.remove("hidden");
    movieList.classList.add("hidden");

    const singleMoviePageContainer = document.querySelector('.singleMoviePageContainer');
    const singleMoviePageTitle = document.querySelector('.singleMoviePageTitle');
    const moviePageImage = document.querySelector('.moviePageImage');
    const moviePageSeats = document.querySelector('.moviePageSeats');
    const reserveSeatsButton = document.querySelector('.reserveSeats');
    const cancelReservationButton = document.querySelector('.cancelReservation');

    if (!isAdmin) {
        cancelReservationButton.style.display = "none"
    }
    if (isAdmin) {
        reserveSeatsButton.style.display = "none"
    }

    let bookedSeats = JSON.parse(localStorage.getItem(`${title}_bookedSeats`)) || [];

    // Set the movie title and image
    if (singleMoviePageTitle) {
        singleMoviePageTitle.textContent = title;
    }
    if (moviePageImage) {
        moviePageImage.src = image;
    }

    // Function to update the seat count display
    function updateSeatCount() {
        if (singleMoviePageTitle) {
            const availableSeats = totalSeats - bookedSeats.length;
            singleMoviePageTitle.textContent = `${title} - Available seats: ${availableSeats} of ${totalSeats}`;
        }
        const existingMovieImage = singleMoviePageContainer.querySelector('.movieImageSinglePage');

        if (!existingMovieImage) {
            const movieImage = document.createElement('img');
            movieImage.classList.add('movieImageSinglePage');
            movieImage.src = image;
            movieImage.alt = title;
            singleMoviePageContainer.appendChild(movieImage);
        }
    }

    // Clear existing seats
    if (moviePageSeats) {
        moviePageSeats.innerHTML = '';
    }

    // Create seat elements
    for (let i = 1; i <= totalSeats; i++) {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.textContent = i;

        if (bookedSeats.includes(i)) {
            seatDiv.classList.add('booked');
        }

        // Add event listener for regular users
        if (!isAdmin && !bookedSeats.includes(i) && moviePageSeats) {
            seatDiv.addEventListener('click', () => {
                seatDiv.classList.toggle('reserved');
            });
        }

        if (moviePageSeats) {
            moviePageSeats.appendChild(seatDiv);
        }
    }

    // Remove any existing event listeners
    const newReserveSeatsButton = reserveSeatsButton.cloneNode(true);
    reserveSeatsButton.parentNode.replaceChild(newReserveSeatsButton, reserveSeatsButton);

    const newCancelReservationButton = cancelReservationButton.cloneNode(true);
    cancelReservationButton.parentNode.replaceChild(newCancelReservationButton, cancelReservationButton);

    // Event listener for reserve seats button
    if (newReserveSeatsButton && !isAdmin) {
        newReserveSeatsButton.addEventListener('click', () => {
            document.querySelectorAll('.seat.reserved').forEach(seat => {
                seat.classList.remove('reserved');
                seat.classList.add('booked');
                bookedSeats.push(parseInt(seat.textContent));
            });
            localStorage.setItem(`${title}_bookedSeats`, JSON.stringify(bookedSeats));
            updateSeatCount();

        });
    }

    // Event listener for cancel reservation button (admin only)
    if (newCancelReservationButton && isAdmin) {
        newCancelReservationButton.addEventListener('click', () => {
            document.querySelectorAll('.seat.booked').forEach(seat => {

                const seatNumber = parseInt(seat.textContent);
                const index = bookedSeats.indexOf(seatNumber);
                if (index !== -1) {
                    bookedSeats.splice(index, 1);
                }
                seat.classList.remove('booked');

            });
            localStorage.setItem(`${title}_bookedSeats`, JSON.stringify(bookedSeats));
            updateSeatCount();

        });
    }

    // Initial update of seat count display
    updateSeatCount();
}
