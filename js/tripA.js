// import { apiBaseUrl } from "./config.js";

// async function loadTrip(userId) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/me/trips`, {
//             headers: {
//                 Authorization: `Bearer ${getToken()}`
//             }
//         });
//         if (!response.ok) {
//             throw new Error('Failed to fetch trips');
//         }
//         const trips = await response.json();
//         const tripContainer = document.querySelector('.roadbook_container');

//         // Supprime tous les voyages actuellement affichés dans le conteneur
//         tripContainer.innerHTML = '';

//         // Boucle à travers les voyages récupérés et les affiche dans la page HTML
//         trips.forEach(trip => {
//             const template = document.querySelector('#trip-card-template');
//             const card = document.importNode(template.content, true);

//             card.querySelector('.trip_title').textContent = trip.title;
//             card.querySelector('.trip_photo').setAttribute('src', trip.photo);
//             card.querySelector('.trip_comment').textContent = trip.comment;
//             card.querySelector('.trip_date-start').textContent = trip.dateStart;
//             card.querySelector('.trip_date-end').textContent = trip.dateEnd;
//             card.querySelector('.trip_note').textContent = trip.note;

//             tripContainer.appendChild(card);
//         });
//     } catch (error) {
//         console.error('Error loading trips:', error);
//     }
// }

// function getUserIdFromToken() {
//     const token = localStorage.getItem('token');
//     if (!token) return null;

//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.id;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const userId = getUserIdFromToken();
//     loadTrip(userId);
// });