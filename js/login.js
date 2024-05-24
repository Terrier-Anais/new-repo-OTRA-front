
const form = document.getElementById('loginForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const confirmation = document.getElementById('confirmation').value;
    console.log(email, password);

    // Crée un objet de données pour la requête
    const formData = {
        email: email,
        password: password,
    };
    console.log(formData);

    const response = await fetch('http://localhost:3000/api/login', {
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
        window.location.href = "roadbook.html";
    });

    ;    
    /*axiosInstance.post('${baseURL}/login', formData)
        .then(function(response) {
            console.log('Succès:', response.data);
            localStorage.setItem('token', response.data.token);
            console.log('token', response.data.token);
            alert('Inscription réussie !');
            window.location.href = "roadbook.html";
        })
        .catch(function(error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription. Veuillez réessayer.');
        });*/
});



