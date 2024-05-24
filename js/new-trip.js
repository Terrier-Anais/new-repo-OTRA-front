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
export function createCard(title, photo, comment, dateStart, dateEnd, duration, note) {
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
export function handleFormSubmission(event) {
  event.preventDefault(); // Empêcher la soumission par défaut du formulaire

  // Récupérer les données du formulaire
  const newTripTitle = document.getElementById('new-trip_title').value;
  const newTripComment = document.getElementById('new-trip_comment').value;
  const newTripDateStart = document.getElementById('new-trip_date-start').value;
  const newTripDateEnd = document.getElementById('new-trip_date-end').value;
  const newTripNote = document.getElementById('new-trip_note').value;

  console.log("New Trip Title:", newTripTitle);
  console.log("New Trip Comment:", newTripComment);
  console.log("New Trip Date Start:", newTripDateStart);
  console.log("New Trip Date End:", newTripDateEnd);
  console.log("New Trip Note:", newTripNote);

  //Calcul de la durée en fonction des dates renseignées :
  const startDate = new Date(newTripDateStart); // Convertir la date de début en objet Date
  const endDate = new Date(newTripDateEnd); // Convertir la date de fin en objet Date
  const newTripDuration = (Math.ceil((Math.abs(endDate) - (startDate))) / (1000 * 60 * 60 * 24));// Calculer la durée du voyage en jours

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