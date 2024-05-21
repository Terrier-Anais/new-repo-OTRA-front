const form = document.getElementById('signinForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const lastname = document.getElementById('surname').value;
    const firstname = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmation = document.getElementById('confirmation').value;
    console.log(email, lastname, firstname, username, password, confirmation);

    // Crée un objet de données pour la requête
    const formData = {
        email: email,
        lastname: lastname,
        firstname: firstname,
        username: username,
        password: password,
        confirmation: confirmation
    };
    console.log(formData);

    
    axios.post('http://localhost:3000/api/signup', formData)
        .then(function(response) {
            console.log('Succès:', response.data);
            alert('Inscription réussie !');
        })
        .catch(function(error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'inscription. Veuillez réessayer.');
        });
});