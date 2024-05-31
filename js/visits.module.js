import { getVisits } from "./api.js";


// // Récupérer le conteneur des visites
// const tripCardContent = document.querySelector('.trip-card_content');
// console.log(tripCardContent);
// // récupérer l'id du voyage sur le conteneur de voyage
// const tripId = tripCardContent.querySelector('.trip-visits-details').dataset.tripId;
// console.log(tripId);



// Fonction pour récupérer et afficher les visites d'un voyage
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

export function addVisitToVisitsContainer (visit) {
    const visitTemplate = document.querySelector("#visit-details_template");
    const visitClone = visitTemplate.textContent.cloneNode(true);
    
    visitClone.querySelector('[slot="title-content"]').textContent = title;
    visitClone.querySelector('[slot="dateStart-content"]').textContent = `Date de début: ${dateStart}`;
    visitClone.querySelector('[slot="dateEnd-content"]').textContent = `Date de fin: ${dateEnd}`;
    visitClone.querySelector('[slot="description-content"]').textContent = `Description : ${visit.description}`;
    visitClone.querySelector('[slot="visit-photo"]').src = photo;
    
    // Ajout d'un listener sur le bouton 🖍️ d'une visite
    const editVisitBtn = cardClone.querySelector('[slot="edit-button"]');
    const modalUpdateVisitCloseBtn = document.querySelector('.modal_update-visit-close');
    
    modalUpdateVisitCloseBtn.addEventListener('click', toggleUpdateVisitModal);
    modalOverlayConnection.addEventListener('click', toggleUpdateVisitModal);
    function toggleUpdatevisitModal() {
        modalUpdateTrip.classList.toggle('active');
    }
    editVisitBtn.addEventListener("click", () => {
        const editVisitModal = document.querySelector("#modal_update-visit");
        toggleUpdatevisitModal();
    })
}

fetchAndDisplayVisits(1); // Appel de la fonction fetchAndDisplayVisits avec l'identifiant du voyage 1
