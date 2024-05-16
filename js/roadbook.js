// script for the new trip modal>


const modalNewTrip = document.querySelector('.modal_new-trip');
const modalNewTripBtn = document.querySelector('#add-new-trip');
const modalNewTripCloseBtn = document.querySelector('.modal_new-trip_close');
const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');

modalNewTripBtn.addEventListener('click', toggleModal);
modalNewTripCloseBtn.addEventListener('click', toggleModal);
modalOverlayConnection.addEventListener('click', toggleModal);

function toggleModal() {
    modalNewTrip.classList.toggle('active');
    console.log('toggle modal');
};