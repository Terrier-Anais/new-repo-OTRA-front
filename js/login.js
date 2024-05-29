//script span registration

const register = document.getElementById('registration');
register.addEventListener('click', () => {
    window.location.href = 'signin.html';
});

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

    const response = await fetch('/api/login', {
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
        alert('Connexion réussie !');
        window.location.href = "roadbook.html";
    });
  });
