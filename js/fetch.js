


const form = document.getElementById('signinForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const lastname = document.getElementById('surname').value;
    const firstname = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // const confirmation = document.getElementById('confirmation').value;
    console.log(email, lastname, firstname, username, password);

    // Crée un objet de données pour la requête
    const formData = {
        email: email,
        lastname: lastname,
        firstname: firstname,
        pseudo: username,
        password: password,
        // confirmation: confirmation
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



// http://localhost:3000/api/me/trips

// test recup trips sa fonction



// axios.get('http://localhost:3000/api/me/trips')
//     .then(function(response) {
//         console.log('Succès:', response.data);      
//     })
//     .catch(function(error) {
//         console.error('Erreur:', error);
//     });

// script span connection

// const connect = document.getElementById('connection');
// connect.addEventListener('click', () => {
//     window.location.href = 'login.html';
// });

// //script span registration

// const register = document.getElementById('registration');
// register.addEventListener('click', () => {
//     window.location.href = 'signin.html';
// });

// //script back homepage on logo title

// const titleLogo = document.querySelector('.left');
// titleLogo.addEventListener('click', () => {
//     window.location.href = 'home.html';
// });

