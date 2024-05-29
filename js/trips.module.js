const getToken = () => {
  return localStorage.getItem('token');
    };
console.log(getToken());

// fonction pour récupérer l'ID de l'utilisateur à partir du token
function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      return payload.id;
  } catch (e) {
      console.error('Failed to decode token', e);
      return null;
  }
}


async function fetchAndDisplayTrips() {
try {
  const trips = await getTrips();

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
return;
}else{
addTripToTripsContainer(createdTrip);
addTripForm.reset();

}});}
listenToSubmitOnAddTripForm()


// On récupère tous les voyages de l'utilisateur connecté en utilisant l'API
async function getTrips() {
  try {
    const response = await fetch('http://localhost:3000/api/me/trips', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const trips = await response.json();
    console.log('Success:', trips);
    return trips;
  } catch (error) {
    console.error('Error:', error);
  }
}
// On affiche les voyages de l'utilisateur connecté 
function addTripToTripsContainer(trip) {
  const TripTemplate = document.querySelector('#trip-card-template');
  if (TripTemplate) {
    const tripClone = document.importNode(TripTemplate.content, true);
    tripClone.querySelector('.trip_title').textContent = trip.title;
    // tripClone.querySelector('.trip_photo').src = trip.photo;
    tripClone.querySelector('.trip_description').textContent = `Description : ${trip.description}`;
    tripClone.querySelector('.trip_dateStart').textContent = `Date de début: ${trip.dateStart}`;
    tripClone.querySelector('.trip_dateEnd').textContent = `Date de fin: ${trip.dateEnd}`;
    tripClone.querySelector('.trip_note').textContent = trip.note;

    // On  affecte l'ID du voyage à l'élément au clone du voyage
    const tripCardContent = tripClone.querySelector('.trip-card_content');
    tripCardContent.dataset.tripId = trip.id;
    // console.log('tripId:', trip.id);

    // On affecte l'ID du voyage au bouton de suppression de voyage
    const deleteTripButton = tripClone.querySelector('.delete-trip_button');
    deleteTripButton.dataset.tripId = trip.id;
   
// On insère le clone du voyage dans la section roadbook_container
    const roadbookSection = document.querySelector('.roadbook_container');
    roadbookSection.appendChild(tripClone);
  } else {
    console.error('Trip template not found');
  }
}
// On créé un nouveau voyage pour l'utilisateur connecté en utilisant l'API
async function createTrip(tripData) {
const user_id = getUserIdFromToken();
   if (!user_id) {
     console.error('User ID not found');
     return null;}
   tripData.user_id = user_id;

     const response = await fetch('http://localhost:3000/api/me/trips', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getToken()}`
       },
       body: JSON.stringify(tripData)
     })
     .then(response => response.json())
     .then(function(response){
           localStorage.setItem('token', response.token);
      //  console.log('token', response.token);
         });
  }
  
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
  if (!updatedTrip) {
    return;
  }
  updateTripForm.reset();
  });
}
listenToSubmitOnUpdateTripForm();

// Envoyer les données du formulaire de modification du voyage à l'API en utilisant l'ID du voyage et les données du formulaire
async function updateTrip(tripId, updatedTripData) { 
  try {
    const response = await fetch(`http://localhost:3000/api/me/trips/${tripId}`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(updatedTripData) 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const trip = await response.json();
    console.log('Success:', trip);
    return trip;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndDisplayTrips();

// function listenToDeleteTripButton(){ 
// }
// // On sélectionne le bouton de suppression de voyage et on écoute l'événement click pour afficher la modale de confirmation de suppression

// const deleteTripButton = document.querySelector('[data-trip-id]');
// console.log(deleteTripButton);
 



// async function deleteTrip(tripId) {
//       try {
//         const response = await fetch(`http://localhost:3000/api/me/trips/${tripId}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${getToken()}`
//           }
//         });

//         if (response.status === 204) {
//           console.log('Success: Trip deleted');
//         } else {
//           const errorData = await response.json();
//           throw new Error(`Error: ${response.status} - ${errorData.message}`);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }

    // besoin de rafraichir la page pour voir les changements
  
