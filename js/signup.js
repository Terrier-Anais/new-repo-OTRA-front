const connect = document.getElementById('connection');
connect.addEventListener('click', () => {
    window.location.href = 'login.html';
});

const form = document.getElementById('signinForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const lastname = document.getElementById('surname').value;
    const firstname = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmation = document.getElementById('confirmation').value;

    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Vérification du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial.');
        return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== confirmation) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    // Crée un objet de données pour la requête
    const formData = {
        email: email,
        lastname: lastname,
        firstname: firstname,
        pseudo: username,
        password: password,
        confirmation: confirmation
    };

    try {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        localStorage.setItem('token', result.token);
        alert('Inscription réussie !');
        window.location.href = "login.html";
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    }
});