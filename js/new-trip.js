// script pour la modale d'ajout d'un voyage

const modalNewTrip = document.querySelector('.modal_new-trip');
const modalNewTripBtn = document.querySelector('#add-new-trip');
const modalNewTripCloseBtn = document.querySelector('.modal_new-trip_close');
const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');

modalNewTripBtn.addEventListener('click', toggleNewTripModal);
modalNewTripCloseBtn.addEventListener('click', toggleNewTripModal);
modalOverlayConnection.addEventListener('click', toggleNewTripModal);

function toggleNewTripModal() {
  modalNewTrip.classList.toggle('active');
};

// Fonction pour créer une nouvelle carte de voyage
function createCard(title, photo, comment, dateStart, dateEnd, duration,note) {
  // Création d'un nouvel élément de carte
  const card = document.createElement('div');
  card.classList.add('trip-card_content');
  
  // Construction du contenu de la carte en utilisant les données du formulaire
  card.innerHTML = `
  <header class="trip-card_header">
  <div class="trip-card_title">
  <h3 class="trip_title">${title}</h3>
  </div>
  <div class="trip-card_update">
  <button class="update-trip_button" type="button"><i class="fa-solid fa-pen"></i></button>
  </div>
  </header>
  <div class="trip-card_photo" id="preview">
  <img class="trip_photo" src="${photo}" alt="Photo du voyage">
  </div>  
  <div class="trip-card_comment">
  <p class="trip_comment">Commentaire :${comment}</p>
  </div>
  <div class="trip-card_flag">
  <p>Drapeau</p>
  </div>
  <div class="trip-card_start-date">
  <p class="trip_date-start">Date de début: ${dateStart}</p>
  </div>
  <div class="trip-card_end-date">
  <p class="trip_date-end">Date de fin: ${dateEnd}</p>
  </div>
  <div id="trip_duration" class="trip-card_duration">
  <p>Durée du voyage :${duration} jour(s)</p>
  </div>
  <div class="trip-card_note">
  <p class="trip_note">${note}</p>
  </div>    
  `;
  return card;
}

// Fonction pour gérer la soumission du formulaire d'ajout de voyage
function handleFormSubmission(event) {
  event.preventDefault(); // Empêcher la soumission par défaut du formulaire

  // Récupérer les données du formulaire
  const newTripTitle = document.getElementById('new-trip_title').value;
  const newTripComment = document.getElementById('new-trip_comment').value;
  const newTripDateStart = document.getElementById('new-trip_date-start').value;
  const newTripDateEnd = document.getElementById('new-trip_date-end').value;
  const newTripNote = document.getElementById('new-trip_note').value;

  //Calcul de la durée en fonction des dates renseignées :
  const startDate = new Date(newTripDateStart);
  const endDate = new Date(newTripDateEnd);
  const newTripDuration = (Math.ceil((Math.abs(endDate) - (startDate))) / (1000 * 60 * 60 * 24));
  console.log(newTripDuration);   

  // Sélectionner l'élément input de type file pour l'image
  const newTripPhotoInput = document.getElementById('new-trip_photo');

  // Vérifier s'il y a un fichier sélectionné
  if (newTripPhotoInput.files) {
    // Créer un objet FileReader
    const reader = new FileReader();
    // Écouter lorsque la lecture du fichier est terminée
    reader.onload = function(event) {
      // Récupérer l'URL de données (data URL) de l'image
      const imageUrl = event.target.result;
      // Créer une nouvelle carte de voyage avec les données du formulaire et l'URL de l'image
      const newCard = createCard(newTripTitle, imageUrl, newTripComment, newTripDateStart, newTripDateEnd, newTripDuration, newTripNote);
      // Ajouter la nouvelle carte à la section de Roadbook
      const roadbookSection = document.querySelector('.roadbook_container');
      roadbookSection.appendChild(newCard);
      console.log(newCard)
    };
    // Lire le contenu du fichier en tant qu'URL de données (data URL)
    
    reader.readAsDataURL(newTripPhotoInput.files[0]);
}}

// Sélectionner le formulaire d'ajout de carte
const newTripForm = document.querySelector("#new-trip_form");

// Écouter la soumission du formulaire
newTripForm.addEventListener("submit", handleFormSubmission);
newTripForm.addEventListener("submit", toggleNewTripModal);
newTripForm.addEventListener("submit", newTripForm.reset);


// script for the update trip modal
const modalUpdateTrip = document.querySelector('.modal_update-trip');
const modalUpdateTripCloseBtn = document.querySelector('.modal_update-trip_close');
modalUpdateTripCloseBtn.addEventListener('click', toggleUpdateTripModal);
modalOverlayConnection.addEventListener('click', toggleUpdateTripModal);
function toggleUpdateTripModal() {
  modalUpdateTrip.classList.toggle('active');
}
let currentTripCard = null;

// Ajout de l'écouteur d'événements pour le bouton update-trip_button
document.querySelector('.roadbook_container').addEventListener('click', function(event) {
  const button = event.target.closest('.update-trip_button');
  if (button) {
    currentTripCard = button.closest('.trip-card_content');
    toggleUpdateTripModal();
  }
});

// Fonction pour modifier le contenu du innerHTML d'une carte de voyage
function updateCardContent(card, title, photo, comment, dateStart, dateEnd, duration, note) {
  // Modifier le contenu de la carte en utilisant les nouvelles données
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