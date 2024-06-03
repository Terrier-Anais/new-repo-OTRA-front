// import { apiBaseUrl } from "./config.js";

// async function updateVisit(visitId, visitData, tripId) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/api/me/trips/${tripId}/visit/${visitId}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${getToken()}`
//             },
//             body: JSON.stringify(visitData)
//         });
//         if (!response.ok) throw new Error('Failed to update visit');
//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
// //     visit photos
// // DELETE supprimer les visites -------- delete par visit_id 

// async function deleteVisit(visitId, tripId) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/api/me/trips/${tripId}/visit/${visitId}`, {
//             method: 'DELETE',
//             headers: {
//                 Authorization: `Bearer ${getToken()}`
//             }
//         });
//         if (!response.ok) throw new Error('Failed to delete visit');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }


// // ecouteur d'évenement

// import { apiBaseUrl } from "./config.js";

// const getToken = () => {
//     return localStorage.getItem('token');
// };

// async function loadVisit() {
//     try {
//         const response = await fetch(`${apiBaseUrl}/me/trips/10/visits`, {
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

//         allVisits.forEach(visit => {
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
    
    
//     newVisit.querySelector('.dateStart').value = visitData.dateStart;
//     newVisit.querySelector('.dateEnd').value = visitData.dateEnd;
//     newVisit.querySelector('.comment').value = visitData.comment;
    
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

