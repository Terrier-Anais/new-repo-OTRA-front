import { getVisits, createVisit } from "./api.js";

const tripId = 2; // Identifiant du voyage 1

// Fonction pour récupérer et afficher les visites d'un voyage
async function fetchAndDisplayVisits(tripId) {
try {
    const visits= await getVisits(tripId);
    console.log(visits);

    if (!visits) {
    return;
    }
    if (!Array.isArray(visits)) {
        console.error('Visits is not an array');
        return;
    }
    
    if (visits.length === 0) {
    console.log('No visits to display');
    return;
    }

    for (const visit of visits) {
    addVisitToVisitsContainer(visit);
    }
} catch (error) {
    console.error('Failed to fetch and display visits:', error);
}
}

function listenToSubmitOnAddVisitForm() {
const addVisitForm = document.querySelector('#new-visit_form');
addVisitForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const visitData = Object.fromEntries(new FormData(addVisitForm));
    console.log(visitData);

    const createdVisit = await createVisit(visitData);

    if (createdVisit) {
    return;
    }
    addVisitToVisitsContainer(createdVisit);
    addVisitForm.reset();
});
}

export function addVisitToVisitsContainer (visit) {
    const visitTemplate = document.querySelector("#visit-details_template");
    if (visitTemplate) {  
    const visitClone =document.importNode(visitTemplate.content, true);
    
    // visitClone.querySelector('[slot="title-content"]').textContent = title;
    visitClone.querySelector('[slot="dateStart-content"]').textContent = `Date de début: ${visit.dateStart}`;
    visitClone.querySelector('[slot="dateEnd-content"]').textContent = `Date de fin: ${visit.dateEnd}`;
    visitClone.querySelector('[slot="comment-content"]').textContent = `Commentaire : ${visit.comment}`;
    // visitClone.querySelector('[slot="visit-photo"]').src = photo;
    visitClone.querySelector('[slot="note-content"]').textContent = `Note de la visite: ${visit.note}/5`;

    // // on affecte l'ID de la visite à l'élément au clone de la visite
    // const visitCardContent = visitClone.querySelector('.visit-card-content');
    // visitCardContent.dataset.visitId = visit.id;
    // console.log('visitId:', visit.id);

    // // On affecte l'id du voyage au bouton de suppression de visite
    // const deleteVisitButton = visitClone.querySelector('.delete-visit_button');
    // deleteVisitButton.dataset.visitId = visit.id;

    // // On affecte l'id de la visite au bouton de modification de visite
    // const editVisitButton = visitClone.querySelector('.edit-visit_button');
    // editVisitButton.dataset.visitId = visit.id;

    // on insère le clone la visite dans le conteneur des visites
    const visitsContainer = document.querySelector('.visit-container');
    console.log(visitsContainer);
    visitsContainer.appendChild(visitClone);
} else {
    console.error('Visit template not found');
}
}

listenToSubmitOnAddVisitForm() ;

fetchAndDisplayVisits(tripId); // Appel de la fonction fetchAndDisplayVisits avec l'identifiant du voyage 1
