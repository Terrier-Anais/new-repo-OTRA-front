import { apiBaseUrl } from './config.js';

const form = document.getElementById('loginForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    console.log(email, password);

    // Crée un objet de données pour la requête
    const formData = {
        email: email,
        password: password,
    };
    console.log(formData);

    const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('token', result.token);
        alert('Connexion réussie !');
        window.location.href = "roadbook.html";
    } else {
        alert('Email ou mot de passe incorrect');
    }
  });