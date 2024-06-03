
// import { apiBaseUrl } from "./config.js";
// const getToken = () => {
//     return localStorage.getItem('token');
//   };

// export async function fetchAndDisplayVisits(tripId) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/api/me/trips/${tripId}/visit`, {
//             headers: {
//                 Authorization: `Bearer ${getToken()}`
//             }
//         });
//         if (!response.ok) throw new Error('Failed to fetch visits');
//         const visits = await response.json();
//         visits.forEach(addVisitToContainer);
//     } catch (error) {
//         console.error('Failed to fetch and display visits:', error);
//     }
// }

// ecouteur d'événement

// export async function getVisits(tripId) {
//     try {
//       const response = await fetch(`http://localhost:3000/api/me/trips/${tripId}`, {
//         headers: {
//           Authorization: `Bearer ${getToken()}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const trips = await response.json();
//       console.log('Success:', trips);
//       return trips;
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

