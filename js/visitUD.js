import { apiBaseUrl } from "./config.js";

async function updateVisit(visitId, visitData, tripId) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/me/trips/${tripId}/visit/${visitId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify(visitData)
        });
        if (!response.ok) throw new Error('Failed to update visit');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
//     visit photos
// DELETE supprimer les visites -------- delete par visit_id 

async function deleteVisit(visitId, tripId) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/me/trips/${tripId}/visit/${visitId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (!response.ok) throw new Error('Failed to delete visit');
    } catch (error) {
        console.error('Error:', error);
    }
}

// ecouteur d'évenement