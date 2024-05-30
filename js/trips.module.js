const getToken = () => {
  return localStorage.getItem('token');
    };
    getToken();
    

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
  return;
  }else{
  addTripToTripsContainer(createdTrip);
  addTripForm.reset();
 
  }});}

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
    tripClone.querySelector('.trip_photo').src = trip.photo;
    tripClone.querySelector('.trip_description').textContent = `Description : ${trip.description}`;
    tripClone.querySelector('.trip_dateStart').textContent = `Date de début: ${trip.dateStart}`;
    tripClone.querySelector('.trip_dateEnd').textContent = `Date de fin: ${trip.dateEnd}`;
    tripClone.querySelector('.trip-card_duration').textContent = `Durée du voyage : ${trip.duration} jour(s)`;
    tripClone.querySelector('.trip_note').textContent = `Note du voyage: ${trip.note}/5`;

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

// Converti un fichier blob en string base64
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
  });
}

async function uploadImage(data) {
  try {
      const response = await fetch('http://localhost:3000/api/upload', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
  } catch (error) {
      console.error(error);
  }
}

listenToSubmitOnAddTripForm();

// On créé un nouveau voyage pour l'utilisateur connecté en utilisant l'API
async function createTrip(tripData) {
  // CHECK PHOTO
  console.log('Youpi', tripData);
  if (tripData.photo) {

    const file = tripData.photo;
    if (file instanceof Blob) {
        const base64String = await convertFileToBase64(file);
        tripData.photo = base64String;
        await uploadImage(tripData);
    } else {
        console.error('The selected file is not valid.');
    }
}
// END CHECK PHOTO

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
    if (updatedTrip) {
      location.reload(); // Refresh the page to reflect changes
    } else {
    return;
  }
  updateTripForm.reset();
  });
}
listenToSubmitOnUpdateTripForm();

// Envoyer les données du formulaire de modification du voyage à l'API en utilisant l'ID du voyage et les données du formulaire
async function updateTrip(tripId, updatedTripData) { 
  console.log('Youpi', updatedTripData);
  if (updatedTripData.photo) {

    const file = updatedTripData.photo;
    if (file instanceof Blob) {
        const base64String = await convertFileToBase64(file);
        updatedTripData.photo = base64String;
        await uploadImage(updatedTripData);
    } else {
        console.error('The selected file is not valid.');
    }
}
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

// function listenToDeleteTripButton(trip){ 
//   // On sélectionne le bouton de suppression de voyage et on écoute l'événement click pour afficher la modale de confirmation de suppression
//   const TripTemplate = document.querySelector('#trip-card-template');
//   const tripClone = document.importNode(TripTemplate.content, true);
//     // On affecte l'ID du voyage au bouton de suppression de voyage
//     const deleteTripButton = tripClone.querySelector('.delete-trip_button');
//     deleteTripButton.dataset.tripId = trip.id;
//     console.log(deleteTripButton);
// }
// listenToDeleteTripButton();

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
  