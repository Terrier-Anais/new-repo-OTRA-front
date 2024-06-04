document.addEventListener('DOMContentLoaded', function() {
    const pseudoButton = document.querySelector(".right");
    pseudoButton.addEventListener("click", function() {
    window.location.href = "profil.html"; 
  });});

function addVisitToContainer (visit) {
    
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
    function toggleUpdateVisitModal() {
        modalUpdateTrip.classList.toggle('active');
    }
    editVisitBtn.addEventListener("click", () => {
        const editVisitModal = document.querySelector("#modal_update-visit");
        toggleUpdateVisitModal();
    })
    
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


  const modalAddPhotos = document.querySelector('#modal_add-photos'); // Sélectionner la modale d'ajout de photos
  const modalAddPhotosBtn = document.querySelector('#add-photos_button'); // Sélectionner le bouton d'ajout de photos
  const modalAddPhotosCloseBtn = document.querySelector('.modal_add-photos-close'); // Sélectionner le bouton de fermeture de la modale
  const modalOverlayPhotos = document.querySelector('.overlay_modal_trigger');// Sélectionner l'overlay de la modale
  // Fonction pour basculer la visibilité de la modale
  function toggleAddPhotosModal() {
    modalAddPhotos.classList.toggle('active');
  }

  // Ajouter des écouteurs d'événements
  modalAddPhotosBtn.addEventListener('click', (event) => {
  console.log('click')
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut
    toggleAddPhotosModal();
  });

  modalAddPhotosCloseBtn.addEventListener('click', toggleAddPhotosModal); // Ajouter un écouteur d'événements pour le bouton de fermeture de la modale
  modalOverlayPhotos.addEventListener('click', toggleAddPhotosModal); // Ajouter un écouteur d'événements pour l'overlay de la modale

    
function listenToSubmitOnAddVisitForm() {
        
    const modalNewVisit = document.querySelector('.modal_new-visit');
        
    const addVisitForm = document.querySelector("#new-visit_form");
        
    // Ecouter le submit sur le formulaire, en cas de click : 
    addVisitForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // preventDefault
            
        // Récupérer le contenu du formulaire { content, color }
        const visitData = Object.fromEntries(new FormData(addVisitForm));
        // Récupérer l'ID de la liste pour créer la carte : dans les dataset
        const visitId = parseInt(modalNewVisit.dataset.visitId);
            
        // POSTS /cards   avec BODY = { content, color, list_id }
        const body = { content: visitData.content, visit_id: visitId };
        const createdVisit = createVisit(body);
            
        addVisitForm.reset();
        toggleNewVisitModal()
        })}
        



//         let slideIndex = 0;

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.querySelectorAll('.visit-photos_container .photo');
//     if (n >= slides.length) { slideIndex = 0; }
//     if (n < 0) { slideIndex = slides.length - 1; }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].classList.remove('active');
//     }
//     slides[slideIndex].classList.add('active');
//     slides[(slideIndex + 1) % slides.length].classList.add('active');
//     slides[(slideIndex + 2) % slides.length].classList.add('active');
// }

// // Initially show the first three photos
// document.addEventListener('DOMContentLoaded', () => showSlides(slideIndex));

