import { createCard, handleFormSubmission } from "./new-trip.js";


// script pour la modale de modification d'un voyage :
const modalUpdateTrip = document.querySelector('.modal_update-trip');
const modalUpdateTripCloseBtn = document.querySelector('.modal_update-trip_close');
const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');
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

// Fonction pour modifier le contenu du template d'une carte de voyage
function updateCardContent(card, title, photo, comment, dateStart, dateEnd, duration, note) {
  // Modifier le contenu de la carte en utilisant les nouvelles données
  createCard.card = card;
  card.querySelector('.trip_title').textContent = title;
  card.querySelector('.trip_photo').src = photo;
  card.querySelector('.trip_comment').textContent = `Commentaire : ${comment}`;
  card.querySelector('.trip_date-start').textContent = `Date de début: ${dateStart}`;
  card.querySelector('.trip_date-end').textContent = `Date de fin: ${dateEnd}`;
  card.querySelector('.trip-card_duration').textContent = `Durée du voyage : ${duration} jour(s)`;
  card.querySelector('.trip_note').textContent = note;

}

// Fonction pour gérer la soumission du formulaire de modification d'un voyage :
function handleUpdateFormSubmission(event) {
  event.preventDefault(); // Empêcher la soumission par défaut du formulaire

  // Récupérer les données du formulaire
  const updatedTripTitle = document.getElementById('update-trip_title').value;
  const updatedTripComment = document.getElementById('update-trip_comment').value;
  const updatedTripDateStart = document.getElementById('update-trip_date-start').value;
  const updatedTripDateEnd = document.getElementById('update-trip_date-end').value;
  const updatedTripNote = document.getElementById('update-trip_note').value;

  //Calcul de la durée en fonction des dates renseignées :
  const updatedStartDate = new Date(updatedTripDateStart);
  const updatedEndDate = new Date(updatedTripDateEnd);
  const updatedTripDuration = (Math.ceil((Math.abs(updatedEndDate) - (updatedStartDate))) / (1000 * 60 * 60 * 24));
  console.log(updatedTripDuration);   

  // Sélectionner l'élément input de type file pour l'image
  const updatedTripPhotoInput = document.getElementById('update-trip_photo');

  // Vérifier s'il y a un fichier sélectionné
  if (updatedTripPhotoInput.files.length > 0) {
    // Créer un objet FileReader
    const reader = new FileReader();
    // Écouter lorsque la lecture du fichier est terminée
    reader.onload = function(event) {
      // Récupérer l'URL de données (data URL) de l'image
      const updatedImageUrl = event.target.result;
      // Modifier le contenu de la carte de voyage avec les nouvelles données
      updateCardContent(currentTripCard, updatedTripTitle, updatedImageUrl, updatedTripComment, updatedTripDateStart, updatedTripDateEnd, updatedTripDuration, updatedTripNote);
    };
    // Lire le contenu du fichier en tant qu'URL de données (data URL)
    reader.readAsDataURL(updatedTripPhotoInput.files[0]);
  }else {
    // Si pas de nouvelle image, utiliser l'image existante
    const existingImageUrl = currentTripCard.querySelector('.trip_photo').src;
    updateCardContent(currentTripCard, updatedTripTitle, existingImageUrl, updatedTripComment, updatedTripDateStart, updatedTripDateEnd, updatedTripDuration, updatedTripNote);
  }
}

// Sélectionner le formulaire de modification de carte
const updateTripForm = document.querySelector("#update-trip_form");

updateTripForm.addEventListener("submit", handleUpdateFormSubmission);
updateTripForm.addEventListener("submit", toggleUpdateTripModal);
updateTripForm.addEventListener("submit", updateTripForm.reset);