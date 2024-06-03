import { apiBaseUrl } from "./config.js";

const getToken = () => {

    return localStorage.getItem('token');
};
async function addVisit(visitData) {
    try {
        const response = await fetch(`${apiBaseUrl}/me/trips/10/visit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
              },
            body: JSON.stringify(visitData)
        });

        if (!response.ok) {
            throw new Error(`La requête POST a échoué avec le code ${response.status}`);
        }

        const responseData = await response.json();
        return responseData; 
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la visite:', error);
        throw error; 
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const addVisitForm = document.getElementById('new-visit_form');

    addVisitForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        // Récupérer les valeurs des champs du formulaire
        const dateStart = document.getElementById('dateStart').value;
        const dateEnd = document.getElementById('dateEnd').value;
        const comment = document.getElementById('comment').value;
        // const note = document.getElementById('note').value;
        // const place_id = document.getElementById('place_id').value;
        // const trip_id = document.getElementById('trip_id').value;

        // Créer l'objet visitData avec les valeurs récupérées
        const visitData = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            comment: comment,
            // note: parseInt(note), 
            place_id: 2, 
            trip_id: 10
        };
        try {
            const newVisit = await addVisit(visitData);
            console.log('Nouvelle visite ajoutée avec succès:', newVisit);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la visite:', error);
        }
    });
});

