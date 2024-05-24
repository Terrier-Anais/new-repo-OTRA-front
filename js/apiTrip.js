const getToken = () => {
    return localStorage.getItem('token');
};

const setToken = (token) => {
    localStorage.setItem('token', token);
};

const deleteToken = () => {
    localStorage.removeItem('token');
};

console.log(getToken()); 


// besoin de récupérer l'id du trip depuis le front
async function apiGetOneTrip() {
    const tripId = 1; 
    await fetch(`http://localhost:3000/api/me/trips/${tripId}`, { 
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Success:', data);        
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}
apiGetOneTrip();

const template = document.querySelector('#trip-card-template'); 
  
// Cloner le contenu du template dans un nouvel élément
const card = document.importNode(template.content, true);

// Remplacer les valeurs des éléments du template avec les données fournies
const title =card.querySelector('.trip_title').value;
const photo =card.querySelector('.trip_photo').value;
const comment = card.querySelector('.trip_comment').value;
const dateStart = card.querySelector('.trip_date-start').value;
const dateEnd = card.querySelector('.trip_date-end').value;
const note = card.querySelector('.trip_note').value;

const newTripData = {
    dateStart: "2021-01-01",
    dateEnd: "2021-01-31",
    photo: "photo.jpg",
    title: "Nouveau voyage",
    comment: "Description du voyage",
    note: 4
};

console.log(newTripData);

const response = await fetch('http://localhost:3000/api/me/trips', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(newTripData)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Success:', data);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });

