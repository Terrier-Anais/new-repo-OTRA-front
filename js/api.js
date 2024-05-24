// import { apiBaseUrl } from "./config.js";


// fetch('http://localhost:3000/api/me/trips')
//       .then(response => response.json())
//       .then(json => console.log(json))
     
// getMyTrips();
// async function getMyTrips(){
//     try {
//         const httpResponse = await fetch(`http://localhost:3000/api/me/trips`); // Récupérer les trips via l'API
 
//         if (! httpResponse.ok) { // Si la réponse API n'est pas position (! ok) => on renvoie null
//             console.log(httpResponse);
//                    return null;
//         }
        
//         const trips = await httpResponse.json(); // Convertir la réponse API en JSON
//         console.log(trips);
//         return trips; // Renvoyer les trips

//     } catch (error) { // Catch les erreurs réseaux (je ne peux pas contacter le serveur)
//         console.error(error); // Mieux encore, on log l'erreur avec un service externe dédiée à la collecte d'erreur côté client !
//         return null; // Si on a pas pu récupérer les listes, cette fonction renvoie null
//       }
// }

// export async function createTrip(tripData){
//     try {
//         const httpResponse = await fetch(`${apiBaseUrl}/me/trips`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(tripData)
//         });

//         if (! httpResponse.ok) {
//             console.log(httpResponse);
//             return null;
//         }

//         const createdTrip = await httpResponse.json();
//         return createdTrip;

//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// export async function updateTrip(tripId, tripData){
//     try {
//         const httpResponse = await fetch(`${apiBaseUrl}/trips/${tripId}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(tripData)
//         });

//         if (! httpResponse.ok) {
//             console.log(httpResponse);
//             return null;
//         }

//         const updatedTrip = await httpResponse.json();
//         return updatedTrip;

//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
// export async function deleteTrip(tripId){
//     try {
//         const httpResponse = await fetch(`${apiBaseUrl}/trips/${tripId}`, {
//             method: 'DELETE'
//         });

//         if (! httpResponse.ok) {
//             console.log(httpResponse);
//             return false;
//         }

//         return true;

//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }   