
export function loadSingleMoviePage(title, totalSeats) {
    const singleMoviePage = document.querySelector(".singleMoviePage");
    const movieList = document.querySelector(".movieList");
    singleMoviePage.classList.remove("hidden");
    movieList.classList.add("hidden");

    const singleMoviePageTitle = document.querySelector('.singleMoviePageTitle');
    const moviePageSeats = document.querySelector('.moviePageSeats');
    const reserveSeatsButton = document.querySelector('.reserveSeats');
    const cancelReservationButton = document.querySelector('.cancelReservation');
    let reservedSeats = 0;

    singleMoviePageTitle.textContent = title;
    moviePageSeats.innerHTML = '';

    for (let i = 1; i <= totalSeats; i++) {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('div');
        seatDiv.textContent = i;
        seatDiv.addEventListener('click', () => {
            if (seatDiv.classList.contains('reserved')) {
                seatDiv.classList.remove('reserved');
                reservedSeats--;
            } else if (reservedSeats < totalSeats) {
                seatDiv.classList.add('reserved');
                reservedSeats++;
            }
            updateSeatCount();
        });
        moviePageSeats.appendChild(seatDiv);
    }

    reserveSeatsButton.addEventListener('click', () => {
        document.querySelectorAll('.div.reserved').forEach(seat => {
            seat.classList.add('booked');
            seat.classList.remove('reserved');
        });
        updateSeatCount();
    });

    cancelReservationButton.addEventListener('click', () => {
        if (!isAdmin) return;
        document.querySelectorAll('.div.booked').forEach(seat => {
            seat.classList.remove('booked');
        });
        updateSeatCount();
    });

    function updateSeatCount() {
        const bookedSeats = document.querySelectorAll('.div.booked').length;
        singleMoviePageTitle.textContent = `${title} - Seats booked: ${bookedSeats}/${totalSeats}`;
    }

    updateSeatCount();
}
