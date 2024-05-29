
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

const response = await fetch('/api/me/trips', {
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

