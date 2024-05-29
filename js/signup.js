// script span connection

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
    console.log(email, lastname, firstname, username, password);

    // Crée un objet de données pour la requête
    const formData = {
        email: email,
        lastname: lastname,
        firstname: firstname,
        pseudo: username,
        password: password,
        confirmation: confirmation
    };
    console.log(formData);

    const response = await fetch('http://localhost:3000/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(function(response){
        localStorage.setItem('token', response.token);
        console.log('token', response.token);
        alert('Inscription réussie !');
        window.location.href = "login.html";
    });
});

