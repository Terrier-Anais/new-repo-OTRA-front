// script pour la modale d'ajout d'un voyage :
const modalNewTrip = document.querySelector('.modal_new-trip'); // Sélectionner la modale d'ajout de voyage
const modalNewTripBtn = document.querySelector('#add-new-trip'); // Sélectionner le bouton d'ajout de voyage
const modalNewTripCloseBtn = document.querySelector('.modal_new-trip_close');// Sélectionner le bouton de fermeture de la modale
const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');// Sélectionner l'overlay de la modale

modalNewTripBtn.addEventListener('click', toggleNewTripModal);// Ajouter un écouteur d'événements pour le bouton d'ajout de voyage
modalNewTripCloseBtn.addEventListener('click', toggleNewTripModal);// Ajouter un écouteur d'événements pour le bouton de fermeture de la modale
modalOverlayConnection.addEventListener('click', toggleNewTripModal);// Ajouter un écouteur d'événements pour l'overlay de la modale

// Fonction pour afficher ou masquer la modale d'ajout de voyage
function toggleNewTripModal() {
  modalNewTrip.classList.toggle('active');
};

// script pour la modale de modification d'un voyage :
const modalUpdateTrip = document.querySelector('.modal_update-trip');
const modalUpdateTripCloseBtn = document.querySelector('.modal_update-trip_close');

modalUpdateTripCloseBtn.addEventListener('click', toggleUpdateTripModal);
modalOverlayConnection.addEventListener('click', toggleUpdateTripModal);
function toggleUpdateTripModal() {
  modalUpdateTrip.classList.toggle('active');
}

// Ajout de l'écouteur d'événements pour le bouton update-trip_button
document.querySelector('.roadbook_container').addEventListener('click', function(event) {
  const button = event.target.closest('.update-trip_button');
  if (button) {
    currentTripCard = button.closest('.trip-card_content');
    toggleUpdateTripModal();
  }
});

let currentTripCard = null;

// Ajout de l'écouteur d'événements pour le bouton delete-trip_button
document.querySelector('.roadbook_container').addEventListener('click', function(event) {
  const button = event.target.closest('.delete-trip_button');
  if (button) {
    const tripId = button.getAttribute('data-trip-id');
console.log(tripId);
  currentTripCard = button.closest('.trip-card_content');
  }
}
);

    