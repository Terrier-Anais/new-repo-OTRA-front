// On récupère tous les voyages de l'utilisateur connecté en utilisant l'API
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

export async function getTrips() {
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

  // On créé un nouveau voyage pour l'utilisateur connecté en utilisant l'API
export async function createTrip(tripData) {
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

    // Envoyer les données du formulaire de modification du voyage à l'API en utilisant l'ID du voyage et les données du formulaire
export async function updateTrip(tripId, updatedTripData) { 
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