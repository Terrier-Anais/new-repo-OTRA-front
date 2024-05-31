// import { apiBaseUrl } from "./config.js";

// const getToken = () => {
//         return localStorage.getItem('token');
//       };

//     //   fonction pour créer des nouvelles visites
// async function handleNewVisitFormSubmit(event) {
//     event.preventDefault();  
//     // empeche le comportmement par defaut 
//     const form = event.target;
//     const formData = new FormData(form);
//     const visitData = {
//         // title: formData.get('title'),
//         dateStart: formData.get('dateStart'),
//         dateEnd: formData.get('dateEnd'),
//         description: formData.get('description'),
//     };

//     try {
//         const response = await fetch(`${apiBaseUrl}/api/me/trips/10/visit`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${getToken()}`
//             },
//             body: JSON.stringify(visitData)
//         });
//         if (!response.ok) throw new Error('Failed to add visit');
//         const newVisit = await response.json();
//         addVisitToContainer(newVisit);
//         form.reset();
//         closeModal();
//     } catch (error) {
//         console.error('Failed to add visit:', error);
//     }
// }


// document.getElementById('add-visit-button').addEventListener('submit', handleNewVisitFormSubmit);

// function addVisitToContainer(visit) {
//     const template = document.getElementById('visit-details_template');
//     const visitContainer = document.querySelector('.visit-container');
//     const visitClone = document.importNode(template.content, true);
//     visitClone.querySelector('.dateStart').textContent = `Date de debut: ${visit.dateStart}`;
//     visitClone.querySelector('.dateEnd').textContent = `Date de fin: ${visit.dateEnd}`;
//     visitClone.querySelector('.description').textContent = visit.description;

//     visitContainer.appendChild(visitClone);
// }

