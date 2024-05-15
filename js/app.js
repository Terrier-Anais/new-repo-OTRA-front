// script for the slide show
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 5000); 
}

// script for the connection modal

// script for the connection modal

const modalConnection = document.querySelector('.modal_connection');
const modalConnectionBtn = document.querySelector('#connection');
const modalCloseBtn = document.querySelector('.modal_connection_close');
const modalOverlayConnection = document.querySelector('.overlay_modal_trigger');

modalConnectionBtn.addEventListener('click', toggleModal);
modalCloseBtn.addEventListener('click', toggleModal);
modalOverlayConnection.addEventListener('click', toggleModal);

function toggleModal() {
    modalConnection.classList.toggle('active');
    console.log('toggle modal');
};



