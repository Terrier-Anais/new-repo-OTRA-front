// import { apiBaseUrl } from "./config.js";


// const getToken = () => {
//     return localStorage.getItem('token');
// };



// async function loadVisit() {
//     try {
//         let tripId = localStorage.getItem('tripId');
//         const response = await fetch(`${apiBaseUrl}/me/trips/10`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${getToken()}`
//             }
//         });
//         if (!response.ok) {
//             console.error('Failed to fetch visit:', response);
//             return null;
//         }
//         const allVisits = await response.json();
//         console.log(allVisits, "Toute les visites okay😂");

//         allVisits.visits.forEach(visit => {
//             insertVisit(visit);
//         })
//         return allVisits;
//     } catch (error){
//         console.error(error);
//         return null;
//       }
//       }

// export function insertVisit(visitData){
//     const taskTemplate = document.querySelector('#visit-details_template');
//     const newVisit = document.importNode(taskTemplate.content, true); 
    
    
//     newVisit.querySelector('.dateStart').textContent += ` ${visitData.dateStart}`;
//     newVisit.querySelector('.dateEnd').textContent += ` ${visitData.dateEnd}`;
//     newVisit.querySelector('.comment').textContent += ` ${visitData.comment}`;

//     // if (visitData.tripId) {
//     //     newVisit.querySelector('.tripId').textContent = `Trip ID: ${visitData.tripId}`;
//     // }

//     // newVisit.querySelector('.task').trip.id = visitData.id;
 
// //     newVisit
// //     .querySelector('.delete-visit_button')
// //     .addEventListener('click', handleDeleteButton);
    
// //     newVisit
// //     .querySelector('.edit-visit_button')
// //     .addEventListener('click', handleEditButton);

// //   newVisit
// //     .querySelector('#update-visit_form')
// //     .addEventListener('submit', handleEditForm);

 
//   document.querySelector('.visit-container').appendChild(newVisit);
// }

// document.addEventListener('DOMContentLoaded', loadVisit);


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

