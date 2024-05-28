document.addEventListener('DOMContentLoaded', () => {
  const userId = getUserIdFromToken();
  getToken();
  fetchAndDisplayTrips();
  listenToSubmitOnAddTripForm();
  });


const getToken = () => {
    return localStorage.getItem('token');
    return token;
  };
  
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

  
  function addTripToTripsContainer(trip) {
    const TripTemplate = document.querySelector('#trip-card-template');
    if (TripTemplate) {
      const tripClone = document.importNode(TripTemplate.content, true);
      tripClone.querySelector('.trip_title').textContent = trip.title;
      tripClone.querySelector('.trip_photo').src = trip.photo;
      tripClone.querySelector('.trip_comment').textContent = `Commentaire : ${trip.comment}`;
      tripClone.querySelector('.trip_date-start').textContent = `Date de début: ${trip.dateStart}`;
      tripClone.querySelector('.trip_date-end').textContent = `Date de fin: ${trip.dateEnd}`;
        tripClone.querySelector('.trip_note').textContent = trip.note;
      // Ajoutez la carte au conteneur de voyages ici si nécessaire
      const roadbookSection = document.querySelector('.roadbook_container');
      roadbookSection.appendChild(tripClone);
    } else {
      console.error('Trip template not found');
    }
  }
  
  function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload)
    return payload.id;
}

async function createTrip(tripData) {
 const userId = getUserIdFromToken();
    if (!userId) {
      console.error('User ID not found');
      return null;}
    tripData.userId = userId;
console.log(tripData);
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
        console.log('token', response.token);
           
    });
  }

  async function listenToSubmitOnAddTripForm() {
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



  // async function updateTrip(tripId, updatedTripData) {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/me/trips/${tripId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${getToken()}`
  //       },
  //       body: JSON.stringify(updatedTripData)
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const trip = await response.json();
  //     console.log('Success:', trip);
  //     return trip;
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // async function deleteTrip(tripId) {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/me/trips/${tripId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     });
  
  //     if (response.status === 204) {
  //       console.log('Success: Trip deleted');
  //       // Mettez à jour l'interface utilisateur ici, par exemple, en retirant l'élément de la liste des voyages
  //     } else {
  //       const errorData = await response.json();
  //       throw new Error(`Error: ${response.status} - ${errorData.message}`);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };