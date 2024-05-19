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
  console.log('toggle modal');
};

// script pour l'ajout d'une nouvelle card lors de la soumission du formulaire:

// Fonction pour créer une nouvelle carte de voyage
function createCard(title, photo, comment, dateStart, dateEnd, note) {
  // Créer un nouvel élément de carte
  const card = document.createElement('div');
  card.classList.add('trip-card_content');
  
  // Construire le contenu de la carte en utilisant les données du formulaire
  card.innerHTML = `
  <header class="trip-card_header">
  <div class="trip-card_title">
  <h3 class="trip_title">${title}</h3>
  </div>
  <div class="trip-card_update">
  <button id="update-trip_button" type="button"><i class="fa-solid fa-pen"></i></button>
  </div>
  </header>
  <div class="trip-card_photo">
  <img class="trip_photo" src="${photo}" alt="Photo du voyage">
  </div>  
  <div class="trip-card_comment">
  <p class="trip_comment">${comment}</p>
  </div>
  <div class="trip-card_flag">
  <p>Drapeau</p>
  </div>
  <div class="trip-card_start-date">
  <p class="trip_date-start">${dateStart}</p>
  </div>
  <div class="trip-card_start-date">
  <p class="trip_date-end">${dateEnd}</p>
  </div>
  <div class="trip-card_duration">
  <p>Durée</p>
  </div>
  <div class="trip-card_note">
  <p class="trip_note">${note}</p>
  </div>    
  `;
  return card;
}
// Selectionner le formulaire d'ajout de carte
const newTripForm = document.querySelector("#new-trip_form");
// Ecouter le submit,  
newTripForm.addEventListener("submit", (event) => { 
  event.preventDefault(); // En cas de submit : prevent default
  //récupérer les données du formulaire
  const newTripTitle = document.getElementById('new-trip_title').value;
  const newTripPhoto = document.getElementById('new-trip_photo').value;
  const newTripComment = document.getElementById('new-trip_comment').value;
  const newTripDateStart = document.getElementById('new-trip_date-start').value;
  const newTripDateEnd = document.getElementById('new-trip_date-end').value;
  const newTripNote = document.getElementById('new-trip_note').value;
  console.log(newTripTitle);
  console.log(newTripPhoto);
  console.log(newTripComment);
  console.log(newTripDateStart);
  console.log(newTripDateEnd);
  console.log(newTripNote);
  
  const newCard = createCard(newTripTitle, newTripPhoto, newTripComment, newTripDateStart, newTripDateEnd, newTripNote);
  const roadbookSection = document.querySelector('.roadbook_container');
  roadbookSection.appendChild(newCard)
  const modalNewTripSubmitBtn = document.querySelector('#add-trip_button');
  modalNewTripSubmitBtn.addEventListener('click', toggleNewTripModal);
})




