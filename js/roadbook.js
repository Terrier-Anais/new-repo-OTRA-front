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

// Fonction pour créer une nouvelle carte de voyage
function createCard(title, photo, comment, dateStart, dateEnd, duration, note) {
  // Sélectionner le template de carte de voyage
    const template = document.querySelector('#trip-card-template'); 
  
    // Cloner le contenu du template dans un nouvel élément
    const card = document.importNode(template.content, true);
  
    // Remplacer les valeurs des éléments du template avec les données fournies
    card.querySelector('.trip_title').textContent = title;
    card.querySelector('.trip_photo').src = photo;
    card.querySelector('.trip_comment').textContent = `Commentaire : ${comment}`;
    card.querySelector('.trip_date-start').textContent = `Date de début: ${dateStart}`;
    card.querySelector('.trip_date-end').textContent = `Date de fin: ${dateEnd}`;
    card.querySelector('.trip-card_duration').textContent = `Durée du voyage : ${duration} jour(s)`;
    card.querySelector('.trip_note').textContent = note;
  
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

  // console.log("New Trip Title:", newTripTitle);
  // console.log("New Trip Comment:", newTripComment);
  // console.log("New Trip Date Start:", newTripDateStart);
  // console.log("New Trip Date End:", newTripDateEnd);
  // console.log("New Trip Note:", newTripNote);

  //Calcul de la durée en fonction des dates renseignées :
  const startDate = new Date(newTripDateStart); // Convertir la date de début en objet Date
  const endDate = new Date(newTripDateEnd); // Convertir la date de fin en objet Date
  const newTripDuration = (Math.ceil((Math.abs(endDate) - (startDate))) / (1000 * 60 * 60 * 24));// Calculer la durée du voyage en jours

  // console.log(newTripDuration);   

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

// script pour la suppression d'un voyage :
document.querySelector('.roadbook_container').addEventListener('click', function(event) {
  const button = event.target.closest('.delete-trip_button');
  if (button) {
    const tripCard = button.closest('.trip-card_content');
    const deleteTrip = confirm('Voulez-vous vraiment supprimer ce voyage ?');
    if (deleteTrip === true) {
    tripCard.remove();}
  }
});