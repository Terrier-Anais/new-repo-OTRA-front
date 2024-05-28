
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

const userProfile = document.getElementById('user');
userProfile.addEventListener('click', function() {
    window.location.href = 'profil.html';
});
