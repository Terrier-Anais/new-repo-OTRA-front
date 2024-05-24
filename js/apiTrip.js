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
