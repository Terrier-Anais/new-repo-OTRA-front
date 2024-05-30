const getToken = () => {
    return localStorage.getItem('token');
      };
  // fonction pour récupérer l'ID de l'utilisateur à partir du token
  function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload);
        return payload.id;
    } catch (e) {
        console.error('Failed to decode token', e);
        return null;
    }
  }

const userProfile = document.getElementById('user');
userProfile.addEventListener('click', function() {
    window.location.href = 'profil.html';
});

// Script pour afficher la modale d'ajout d'un voyage
const modalNewVisit = document.querySelector('.modal_new-visit'); // Sélectionner la modale d'ajout de voyage
const modalNewVisitBtn = document.querySelector('#add-new-visit'); // Sélectionner le bouton d'ajout de voyage
const modalNewVisitCloseBtn = document.querySelector('.modal_new-visit-close');// Sélectionner le bouton de fermeture de la modale
const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');// Sélectionner l'overlay de la modale
    
modalNewVisitBtn.addEventListener('click', toggleNewVisitModal);// Ajouter un écouteur d'événements pour le bouton d'ajout de voyage
modalNewVisitCloseBtn.addEventListener('click', toggleNewVisitModal);// Ajouter un écouteur d'événements pour le bouton de fermeture de la modale
modalOverlayConnection.addEventListener('click', toggleNewVisitModal);// Ajouter un écouteur d'événements pour l'overlay de la modale
    
    // Fonction pour afficher ou masquer la modale d'ajout de voyage
function toggleNewVisitModal() {
        modalNewVisit.classList.toggle('active');
};

async function fetchAndDisplayVisits() {
    try {
      const visits = await getVisits();
    
      if (!visits) {
        return;
      }
    
      visits.forEach(visit => {
        addVisitToContainer(visit);
      });
    } catch (error) {
      console.error('Failed to fetch and display trips:', error);
    }
    }

    // On récupère toutes les visites de l'utilisateur connecté en utilisant l'API
async function getVisits() {
    try {
      const response = await fetch(`http://localhost:3000/api/me/trips/${tripId}/visit`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const visits = await response.json();
      console.log('Success:', visits);
      return visits;
    } catch (error) {
      console.error('Error:', error);
    }
  }

function addVisitToContainer (visit) {
    
    const visitTemplate = document.querySelector("#visit-details_template");
    const visitClone = visitTemplate.textContent.cloneNode(true);
    
    visitClone.querySelector('[slot="title-content"]').textContent = title;
    visitClone.querySelector('[slot="dateStart-content"]').textContent = `Date de début: ${dateStart}`;
    visitClone.querySelector('[slot="dateEnd-content"]').textContent = `Date de fin: ${dateEnd}`;
    visitClone.querySelector('[slot="description-content"]').textContent = `Description : ${visit.description}`;
    visitClone.querySelector('[slot="visit-photo"]').src = photo;
    
    // Ajout d'un listener sur le bouton 🖍️ d'une visite
    const updateVisitBtn = cardClone.querySelector('[slot="edit-button"]');
    const modalUpdateVisitCloseBtn = document.querySelector('.modal_update-visit-close');
    const modalUpdateTrip = document.querySelector("#modal_update-visit");
    
    modalUpdateVisitCloseBtn.addEventListener('click', toggleUpdateVisitModal);
    modalOverlayConnection.addEventListener('click', toggleUpdateVisitModal);
    updateVisitBtn.addEventListener("click", toggleUpdateVisitModal);

    function toggleUpdateVisitModal() {
        modalUpdateTrip.classList.toggle('active');
    }
    
    
    // Ajout d'un listener sur le bouton 🗑️ d'une visite
    const deleteVisitBtn= cardClone.querySelector('[slot="delete-button"]');
    deleteVisitBtn.addEventListener("click", () => {
        const deleteVisit = confirm('Voulez-vous vraiment supprimer ce voyage ?');
        if (deleteVisit === true) {
            visitClone.remove();}
        });
        
        const visitContainer = document.querySelector('.visit-container');
        visitContainer.prepend(visitClone)
};
    

    
function listenToSubmitOnAddVisitForm() {
        
    const modalNewVisit = document.querySelector('.modal_new-visit');
        
    const addVisitForm = document.querySelector("#new-visit_form");
        
    // Ecouter le submit sur le formulaire, en cas de click : 
    addVisitForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // preventDefault
            
        // Récupérer le contenu du formulaire
        const visitData = Object.fromEntries(new FormData(addVisitForm));
        
        const createdVisit = createVisit(visitData);
        if (!createdVisit) {
            return;
            }else{
            addVisitToContainer(createdVisit);
            addVisitForm.reset();
            toggleNewVisitModal()
        
        }})
};
listenToSubmitOnAddVisitForm();
        
        
        
        
 // Initialise l'index de la diapositive actuelle à 0
let slideIndex = 0;
        
// Affiche la diapositive initiale
showSlides(slideIndex);
        
// Fonction pour changer de diapositive en ajoutant n à l'index actuel
function plusSlides(n) {
// Met à jour l'index de la diapositive et affiche la nouvelle diapositive
    showSlides(slideIndex += n);
}
        
// Fonction pour afficher la diapositive correspondant à l'index n
function showSlides(n) {
// Récupère toutes les diapositives ayant la classe "photo"
    const slides = document.getElementsByClassName("photo");
            
// Si l'index est supérieur ou égal au nombre de diapositives, retourne à la première diapositive
    if (n >= slides.length) {
        slideIndex = 0;
        }
// Si l'index est inférieur à 0, retourne à la dernière diapositive
    if (n < 0) {
        slideIndex = slides.length - 1;
        }
            
// Masque toutes les diapositives
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
            
// Affiche les deux premières diapositives
    for (let i = 0; i < 2; i++) {
        let currentIndex = (slideIndex + i) % slides.length;
        slides[currentIndex].style.display = "block";
        }
}
        
        