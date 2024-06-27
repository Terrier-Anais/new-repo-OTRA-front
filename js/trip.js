document.addEventListener('DOMContentLoaded', function() {
  const pseudoButton = document.querySelector(".right");
  pseudoButton.addEventListener("click", function() {
      window.location.href = "profil.html"; 
  });

  function addVisitToContainer(visit) {
      const visitTemplate = document.querySelector("#visit-details_template");
      const visitClone = visitTemplate.content.cloneNode(true);

      visitClone.querySelector('[slot="title-content"]').textContent = visit.title;
      visitClone.querySelector('[slot="dateStart-content"]').textContent = `Date de début: ${visit.dateStart}`;
      visitClone.querySelector('[slot="dateEnd-content"]').textContent = `Date de fin: ${visit.dateEnd}`;
      visitClone.querySelector('[slot="description-content"]').textContent = `Description : ${visit.description}`;
      visitClone.querySelector('[slot="visit-photo"]').src = visit.photo;

      // Ajout d'un listener sur le bouton 🖍️ d'une visite
      const editVisitBtn = visitClone.querySelector('[slot="edit-button"]');
      const modalUpdateVisitCloseBtn = document.querySelector('.modal_update-visit-close');

      if (modalUpdateVisitCloseBtn) {
          modalUpdateVisitCloseBtn.addEventListener('click', toggleUpdateVisitModal);
          const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');
          modalOverlayConnection.addEventListener('click', toggleUpdateVisitModal);
      }

      function toggleUpdateVisitModal() {
          const modalUpdateTrip = document.querySelector('#modal_update-visit');
          modalUpdateTrip.classList.toggle('active');
      }

      editVisitBtn.addEventListener("click", () => {
          toggleUpdateVisitModal();
      });

      // Ajout d'un listener sur le bouton 🗑️ d'une visite
      const deleteVisitBtn = visitClone.querySelector('[slot="delete-button"]');
      deleteVisitBtn.addEventListener("click", () => {
          const deleteVisit = confirm('Voulez-vous vraiment supprimer ce voyage ?');
          if (deleteVisit === true) {
              visitClone.remove();
          }
      });

      const visitContainer = document.querySelector('.visit-container');
      visitContainer.prepend(visitClone);
  }

  const modalNewVisit = document.querySelector('.modal_new-visit');
  const modalNewVisitBtn = document.querySelector('#add-new-visit');
  const modalNewVisitCloseBtn = document.querySelector('.modal_new-visit-close');
  const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');

  if (modalNewVisitBtn) {
      modalNewVisitBtn.addEventListener('click', toggleNewVisitModal);
      modalNewVisitCloseBtn.addEventListener('click', toggleNewVisitModal);
      modalOverlayConnection.addEventListener('click', toggleNewVisitModal);
  }

  function toggleNewVisitModal() {
      modalNewVisit.classList.toggle('active');
  }

  const modalAddPhotos = document.querySelector('#modal_add-photos');
  const modalAddPhotosBtn = document.querySelector('#add-photos_button');
  const modalAddPhotosCloseBtn = document.querySelector('.modal_add-photos-close');
  const modalOverlayPhotos = document.querySelector('.overlay_modal_trigger');

  if (modalAddPhotosCloseBtn) {
      modalAddPhotosCloseBtn.addEventListener('click', toggleAddPhotosModal);
      modalOverlayPhotos.addEventListener('click', toggleAddPhotosModal);
  }

  function toggleAddPhotosModal() {
      modalAddPhotos.classList.toggle('active');
  }

  document.querySelector('.visit-container').addEventListener('click', function(event) {
      const button = event.target.closest('#add-photos_button');
      if (button) {
          currentPhotosCard = button.closest('.visit-details');
          toggleAddPhotosModal();
      }
  });

  let currentPhotosCard = null;

  function listenToSubmitOnAddVisitForm() {
      const modalNewVisit = document.querySelector('.modal_new-visit');
      const addVisitForm = document.querySelector("#new-visit_form");

      addVisitForm.addEventListener("submit", async (event) => {
          event.preventDefault();

          const visitData = Object.fromEntries(new FormData(addVisitForm));
          const visitId = parseInt(modalNewVisit.dataset.visitId);
          const body = { content: visitData.content, visit_id: visitId };
          const createdVisit = await createVisit(body);  // Assuming createVisit is a defined function

          addVisitForm.reset();
          toggleNewVisitModal();
      });
  }

  listenToSubmitOnAddVisitForm();
});

