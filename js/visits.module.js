import { getVisits, createVisit } from "./api.js";

// function getTripId() {
//     const tripCardContent = document.querySelector('[data-trip-id]');
//   console.log(tripCardContent);
//     const tripId = tripCardContent.getAttribute('data-trip-id');
//     console.log(tripId);
// }
// getTripId();

// document.querySelectorAll('.view-visits').forEach(button => {
//     button.addEventListener('click', function() {
//         const voyageId = this.closest('.trip-card_content').getAttribute('select-trip-id');
//         // Rediriger vers la page des visites
//         window.location.href = `/visites?voyageId=${voyageId}`;
//     });
//     console.log(voyageId);
// });


const tripId = 1; // Identifiant du voyage 1


// Fonction pour récupérer et afficher les visites d'un voyage et ses photos
async function fetchAndDisplayVisitsWithPhotos(tripId) {
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

        if (visit.photos) {
            for (const photo of visit.photos) {
                addPhotoToVisitContainer(visit.id, photo);
            }

    if (visit.photos) {
        for (const photo of visit.photos) {
            addPhotoToVisitContainer(visit.id);
        }
    } else {
        console.error(`No photos available for visit ID: ${visit.id}`);
    }
    }}
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

// je dois ajouter le tripId dans la fonction addVisitToVisitsContainer pour pouvoir créer une visite pour un voyage spécifique.
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
    

    // on affecte l'ID de la visite à l'élément au clone de la visite
    const visitCardContent = visitClone.querySelector('.visit-details');
    visitCardContent.dataset.visitId = visit.id;
    console.log('visitId:', visit.id);

    // On affecte l'id du voyage au bouton de suppression de visite
    const deleteVisitButton = visitClone.querySelector('.delete-visit_button');
    deleteVisitButton.dataset.visitId = visit.id;

    // On affecte l'id de la visite au bouton de modification de visite
    const editVisitButton = visitClone.querySelector('.edit-visit_button');
    editVisitButton.dataset.visitId = visit.id;

    // on insère le clone la visite dans le conteneur des visites
    const visitsContainer = document.querySelector('.visit-container');
    console.log(visitsContainer);
    visitsContainer.appendChild(visitClone);
} else {
    console.error('Visit template not found');
}
}

function addPhotoToVisitContainer(visitId, photo) {
    const photoTemplate = document.querySelector("#visit-photo_template");
    if (photoTemplate) {
        const photoClone = document.importNode(photoTemplate.content, true);

        // Find the first empty image slot in the cloned template and set the photo URL
        const photoSlot = photoClone.querySelector('[slot="visit-photo"]');
        if (photoSlot) {
            photoSlot.src = photo;
        } else {
            console.error('Photo slot not found');
            return;
        }

        // Set the visitId in the photo container
        const visitPhotoContent = photoClone.querySelector('.visit-photo');
        if (visitPhotoContent) {
            visitPhotoContent.dataset.visitId = visitId;
        } else {
            console.error('Visit photo container not found in the template');
            return;
        }

        // Find the container for the visit using visitId
        const visitPhotosContainer = document.querySelector(`.visit-details[data-visit-id='${visitId}'] .visit-photos_container`);
        if (visitPhotosContainer) {
            visitPhotosContainer.insertBefore(photoClone, visitPhotosContainer.querySelector('.next'));
            console.log('Photo added for visitId:', visitId);
        } else {
            console.error(`Visit details container for visitId ${visitId} not found`);
        }
    } else {
        console.error('Photo template not found');
    }
}



listenToSubmitOnAddVisitForm() ;

fetchAndDisplayVisitsWithPhotos(tripId); 


