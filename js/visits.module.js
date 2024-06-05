import { getVisits, createVisit } from "./api.js";

// Fonction pour récupérer l'id du voyage depuis le local storage
function getTripIdFromLocalStorage() {
    return localStorage.getItem('tripId');
}
// On récupère l'id du voyage depuis le local storage
const tripId = getTripIdFromLocalStorage();
console.log('tripId:', tripId);

// Fonction pour récupérer et afficher les visites d'un voyage et ses photos
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

    //     if (visit.photos) {
    //         for (const photo of visit.photos) {
    //             addPhotoToVisitContainer(visit.id, photo);
    //         }

    // if (visit.photos) {
    //     for (const photo of visit.photos) {
    //         addPhotoToVisitContainer(visit.id);
    //     }
    // } else {
    //     console.error(`No photos available for visit ID: ${visit.id}`);
    // }
    }
} catch (error) {
    console.error('Failed to fetch and display visits:', error);
}
}

// On écoute le submit sur le formulaire d'ajout de visite
function listenToSubmitOnAddVisitForm() {
const addVisitForm = document.querySelector('#new-visit_form');
addVisitForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const visitData = Object.fromEntries(new FormData(addVisitForm));
    const place_id=1;
    visitData.place_id = place_id;
    visitData.trip_id = parseInt(tripId);
    console.log('tripId:', tripId);
    visitData.note=parseInt(visitData.note);
    console.log(visitData);

    const createdVisit = await createVisit(visitData);
    console.log('createdVisit:', createdVisit);

    if (!createdVisit) {
    return;
    }
    addVisitToVisitsContainer(createdVisit);
    addVisitForm.reset();
});

  // on ferme la modale de création de voyage  lors de la soumission du formulaire
  addVisitForm.addEventListener('submit', async function(event) {
    const modalNewVisit = document.querySelector('.modal_new-visit')
    console.log(modalNewVisit);
    modalNewVisit.classList.remove('active');
    location.reload();
  });


}

// Ajouter des visites au conteneur du voyage
export function addVisitToVisitsContainer (visit) {
    const visitTemplate = document.querySelector("#visit-details_template");
    if (visitTemplate) {  
    const visitClone =document.importNode(visitTemplate.content, true);
    
    visitClone.querySelector('[slot="title-content"]').textContent = `${visit.title}`;
    visitClone.querySelector('[slot="dateStart-content"]').textContent = `Date de début: ${visit.dateStart}`;
    visitClone.querySelector('[slot="dateEnd-content"]').textContent = `Date de fin: ${visit.dateEnd}`;
    visitClone.querySelector('[slot="comment-content"]').textContent = `Commentaire : ${visit.comment}`;
    visitClone.querySelector('[slot="geo-content"]').textContent = `Lieu: ${visit.geo}`;
    visitClone.querySelector('[slot="visit-photo"]').src = visit.photo;
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

    // On affecte l'id de la visite au bouton d'ajout de photos
    const addPhotoButton = visitClone.querySelector('#add-photos_button');
    addPhotoButton.dataset.visitId = visit.id;

    // On affecte l'id de la visite à chaque photo de la visite
    const visitPhotos = visitClone.querySelectorAll('.photo');
    visitPhotos.forEach(photo => {
        photo.dataset.visitId = visit.id;

    // on insère le clone la visite dans le conteneur des visites
    const visitsContainer = document.querySelector('.visit-container');
      visitsContainer.appendChild(visitClone);

    });

} else {
    console.error('Visit template not found');
}
}

// const photosContainer = document.querySelector('.visit-photos_container');
// console.log('photosContainer:', photosContainer);

function addPhotosToPhotosContainer(visitId) {
    const photoTemplate = document.querySelector('#visit-photo_template');
    console.log('photoTemplate:', photoTemplate);
    if(photoTemplate) {
    const photoClone = document.importNode(photoTemplate.content, true);
    console.log('photoClone:', photoClone);
    photoClone.querySelector('.photo').dataset.visitId = visitId;
    console.log('visitId:', visitId);
    const photosContainer = document.querySelector('.visit-photo');
    console.log('photosContainer:', photosContainer);
    photosContainer.appendChild(photoClone);
    console.log('Photo added:', visitId);
    }
    else {
        console.error('Photo template not found');
    }
}

// addPhotosToPhotosContainer(10);

// ajouter des photos au containeur de photos de la visite
function listenToSubmitOnAddButtonPhotos() {
document.querySelector('#add-photos_button').addEventListener('click', async function(event) {
    const button = event.target.closest('.add-photos_button');
    if (!button) {
   addPhotosToPhotosContainer(visitId);
    }
});
}
// listenToSubmitOnAddButtonPhotos();

// On écoute le submit sur le formulaire d'ajout de visite
listenToSubmitOnAddVisitForm() ;

// On récupère et affiche les visites avec photos
fetchAndDisplayVisits(tripId); 


