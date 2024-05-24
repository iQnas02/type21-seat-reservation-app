export function initializeSingleMoviePage(isAdmin, title, image, totalSeats) {
    const singleMoviePage = document.querySelector(".mainMoviePage");
    const movieList = document.querySelector(".movieList");

    singleMoviePage.classList.remove("hidden");
    movieList.classList.add("hidden");

    const singleMoviePageTitle = document.querySelector('.singleMoviePageTitle');
    const moviePageImage = document.querySelector('.moviePageImage');
    const moviePageSeats = document.querySelector('.moviePageSeats');
    const reserveSeatsButton = document.querySelector('.reserveSeats');
    const cancelReservationButton = document.querySelector('.cancelReservation');
    let reservedSeats = 0;
    let bookedSeats = 0;

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
            singleMoviePageTitle.textContent = `${title} - Seats booked: ${bookedSeats}/${totalSeats}`;
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

        // Add event listener for regular users
        if (!isAdmin && moviePageSeats) {
            seatDiv.addEventListener('click', () => {
                if (!seatDiv.classList.contains('booked')) {
                    if (seatDiv.classList.contains('reserved')) {
                        seatDiv.classList.remove('reserved');
                        reservedSeats--;
                    } else {
                        seatDiv.classList.add('reserved');
                        reservedSeats++;
                    }
                }
            });
        }

        if (moviePageSeats) {
            moviePageSeats.appendChild(seatDiv);
        }
    }

    // Event listener for reserve seats button
    if (reserveSeatsButton) {
        reserveSeatsButton.addEventListener('click', () => {
            if (isAdmin) return; // Only regular users can reserve seats
            document.querySelectorAll('.seat.reserved').forEach(seat => {
                seat.classList.add('booked');
                seat.classList.remove('reserved');
                bookedSeats++;
            });
            updateSeatCount();
        });
    }

    // Event listener for cancel reservation button (admin only)
    if (cancelReservationButton) {
        cancelReservationButton.addEventListener('click', () => {
            if (!isAdmin) return; // Only admins can cancel reservations
            document.querySelectorAll('.seat.booked').forEach(seat => {
                seat.classList.remove('booked');
                bookedSeats--;
            });
            updateSeatCount();
        });
    }

    // Initial update of seat count display
    updateSeatCount();
}
