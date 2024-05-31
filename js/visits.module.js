import { getVisits } from "./api.js";

async function fetchAndDisplayVisits(tripId) {
    try {
        const visits = await getVisits(tripId);
        console.log(visits);
    
        if (!visits) {
        return;
        }
    
        visits.forEach(visit => {
        addVisitToVisitsContainer(visit);
        });
    } catch (error) {
        console.error('Failed to fetch and display visits:', error);
    }
    }

function addVisitToVisitsContainer(visit) {
    const visitTemplate = document.querySelector('#visit-details_template');
    if (visitTemplate) {
        const visitClone = document.importNode(visitTemplate.content, true);
        visitClone.querySelector('.visit_title').textContent = visit.title;
        visitClone.querySelector('.visit_description').textContent = `Description : ${visit.description}`;
        visitClone.querySelector('.visit_dateStar').textContent = `Date de visite: ${visit.date}`;
        visitClone.querySelector('.visit_note').textContent = `Note de la visite: ${visit.note}/5`;
        visitClone.querySelector('.visit_photo').src = visit.photo;
        document.querySelector('.visit-card_container').appendChild(visitClone);
    }
}


