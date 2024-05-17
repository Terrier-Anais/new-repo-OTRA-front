// script for the update trip modal>

const modalUpdateTrip = document.querySelector('.modal_update-trip');
const modalUpdateTripBtn = document.querySelector('#update-trip_button');
const modalUpdateTripCloseBtn = document.querySelector('.modal_update-trip_close');

modalUpdateTripBtn.addEventListener('click', toggleUpdateTripModal);
modalUpdateTripCloseBtn.addEventListener('click', toggleUpdateTripModal);

function toggleUpdateTripModal() {
    modalUpdateTrip.classList.toggle('active');
    console.log('toggle modal');
}
