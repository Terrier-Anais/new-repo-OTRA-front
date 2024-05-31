import { getTrips, createTrip, updateTrip, deleteTrip } from './api.js';

async function fetchAndDisplayTrips() {
try {
  const trips = await getTrips();
  console.log(trips);

  if (!trips) {
    return;
  }

  trips.forEach(trip => {
    addTripToTripsContainer(trip);
  });
} catch (error) {
  console.error('Failed to fetch and display trips:', error);
}
}

function listenToSubmitOnAddTripForm() {
  const addTripForm = document.querySelector('#new-trip_form');
  addTripForm.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const tripData = Object.fromEntries(new FormData(addTripForm));
    console.log(tripData);
  
    const createdTrip = await createTrip(tripData);
  if (!createdTrip) {
  return
  }
  addTripToTripsContainer(createdTrip);
  addTripForm.reset();
  });

  // on ferme la modale de création de voyage  lors de la soumission du formulaire
  addTripForm.addEventListener('submit', async function(event) {
    const modalNewTrip = document.querySelector('.modal_new-trip')
    console.log(modalNewTrip);
     modalNewTrip.classList.remove('active');
     location.reload();
  });
}


// On affiche les voyages de l'utilisateur connecté 
function addTripToTripsContainer(trip) {
  const TripTemplate = document.querySelector('#trip-card-template');
  if (TripTemplate) {
    const tripClone =document.importNode(TripTemplate.content, true);
    tripClone.querySelector('.trip_title').textContent = trip.title;
    tripClone.querySelector('.trip_photo').src = trip.photo;
    tripClone.querySelector('.trip_description').textContent = `Description : ${trip.description}`;
    const dateStart = new Date(trip.dateStart); // Convertir la date de début en objet Date
    const dateEnd = new Date(trip.dateEnd); // Convertir la date de fin en objet Date
    const tripDuration = (Math.ceil((Math.abs(dateEnd) - (dateStart))) / (1000 * 60 * 60 * 24)) + 1;// Calculer la durée du voyage en jours
    tripClone.querySelector('.trip_dateStart').textContent = `Date de début: ${trip.dateStart}`;
    tripClone.querySelector('.trip_dateEnd').textContent = `Date de fin: ${trip.dateEnd}`;
    tripClone.querySelector('.trip-card_duration').textContent = `Durée du voyage : ${tripDuration} jour(s)`;
    tripClone.querySelector('.trip_note').textContent = `Note du voyage: ${trip.note}/5`;

    // On  affecte l'ID du voyage à l'élément au clone du voyage
    const tripCardContent = tripClone.querySelector('.trip-card_content');
    tripCardContent.dataset.tripId = trip.id;
    // console.log('tripId:', trip.id);

    // On affecte l'ID du voyage au bouton de suppression de voyage
    const deleteTripButton = tripClone.querySelector('.delete-trip_button');
    deleteTripButton.dataset.tripId = trip.id;

    // On affecte l'id du voyage au bouton de selection du voyage
    const selectTripButton = tripClone.querySelector('.trip-visits-details');
    selectTripButton.dataset.tripId = trip.id;

   
// On insère le clone du voyage dans la section roadbook_container
    const roadbookSection = document.querySelector('.roadbook_container');
    roadbookSection.appendChild(tripClone);
  } else {
    console.error('Trip template not found');
  }
}
listenToSubmitOnAddTripForm();
 
 // Sélectionner le clone qui contient le voyage à modifier
function listenToSubmitOnUpdateTripForm() {
  const updateTripForm = document.querySelector('#update-trip_form');
  updateTripForm.addEventListener('submit', async function(event) {
  event.preventDefault();

 // Sélectionner l'élément qui contient l'ID du voyage
const tripCardContent = document.querySelector('[data-trip-id]');
  console.log(tripCardContent);

// Récupérer la valeur de l'attribut data-trip-id
const tripId = tripCardContent.getAttribute('data-trip-id');
// console.log(tripId); 

// Récupérer les données du formulaire de modification de voyage
const updatedTripData = Object.fromEntries(new FormData(updateTripForm));

// Envoyer les données du formulaire de modification de voyage à l'API
const updatedTrip = await updateTrip(tripId, updatedTripData);
  // console.log (updatedTrip);
    if (updatedTrip) {
      location.reload(); // Refresh the page to reflect changes
    } else {
    return;
  }
  updateTripForm.reset();
  });
}
listenToSubmitOnUpdateTripForm();

fetchAndDisplayTrips();

function listenToDeleteTripButton(){
  document.querySelector('.roadbook_container').addEventListener('click', function(event) {
    const button = event.target.closest('.delete-trip_button');
    if (button) {
      const tripId = button.getAttribute('data-trip-id');
  console.log(tripId);
    deleteTrip(tripId);
    location.reload();
    }
  }
  );
}
listenToDeleteTripButton();