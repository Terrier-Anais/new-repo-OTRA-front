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

// script span connection

const connect = document.getElementById('connection');
connect.addEventListener('click', () => {
    window.location.href = 'login.html';
});

//script span registration

const register = document.getElementById('registration');
register.addEventListener('click', () => {
    window.location.href = 'signin.html';
});

//script back homepage on logo title

const titleLogo = document.querySelector('.left');
titleLogo.addEventListener('click', () => {
    window.location.href = 'home.html';
});


