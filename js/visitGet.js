import { apiBaseUrl } from "./config.js";
const getToken = () => {
    return localStorage.getItem('token');
  };

async function fetchAndDisplayVisits(tripId) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/me/trips/${tripId}/visit`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch visits');
        const visits = await response.json();
        visits.forEach(addVisitToContainer);
    } catch (error) {
        console.error('Failed to fetch and display visits:', error);
    }
}

// ecouteur d'événement