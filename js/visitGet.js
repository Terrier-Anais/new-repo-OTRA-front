import { apiBaseUrl } from "./config.js";


const getToken = () => {
    return localStorage.getItem('token');
};



async function loadVisit() {
    try {
        let tripId = localStorage.getItem('tripId');
        const response = await fetch(`${apiBaseUrl}/me/trips/${tripId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (!response.ok) {
            console.error('Failed to fetch visit:', response);
            return null;
        }
        const allVisits = await response.json();
        console.log(allVisits, "Toute les visites okay😂");

        allVisits.visits.forEach(visit => {
            insertVisit(visit);
        })
        return allVisits;
    } catch (error){
        console.error(error);
        return null;
      }
      }

export function insertVisit(visitData){
    const taskTemplate = document.querySelector('#visit-details_template');
    const newVisit = document.importNode(taskTemplate.content, true); 
    
    
    newVisit.querySelector('.dateStart').textContent += ` ${visitData.dateStart}`;
    newVisit.querySelector('.dateEnd').textContent += ` ${visitData.dateEnd}`;
    newVisit.querySelector('.comment').textContent += ` ${visitData.comment}`;

    // if (visitData.tripId) {
    //     newVisit.querySelector('.tripId').textContent = `Trip ID: ${visitData.tripId}`;
    // }

    // newVisit.querySelector('.task').trip.id = visitData.id;
 
//     newVisit
//     .querySelector('.delete-visit_button')
//     .addEventListener('click', handleDeleteButton);
    
//     newVisit
//     .querySelector('.edit-visit_button')
//     .addEventListener('click', handleEditButton);

//   newVisit
//     .querySelector('#update-visit_form')
//     .addEventListener('submit', handleEditForm);

 
  document.querySelector('.visit-container').appendChild(newVisit);
}

document.addEventListener('DOMContentLoaded', loadVisit);



