getMyTrips();
async function getMyTrips() {
  try {
      // Assurez-vous que l'URL est correcte et que le serveur est en cours d'exécution
      const httpResponse = await fetch('http://localhost:3000/api/me/trips', {
          method: 'GET', // Méthode HTTP
          headers: {
              'Content-Type': 'application/json' // Type de contenu
          }
          // Pas de 'body' nécessaire pour une requête GET
      });

      if (!httpResponse.ok) { // Vérifiez si la réponse est OK
          console.log(httpResponse);
          return null;
      }

      const trips = await httpResponse.json(); // Convertissez la réponse en JSON
      console.log(trips);
      return trips; // Renvoyez les données

  } catch (error) { // Attrapez les erreurs de réseau
      console.error(error); // Log l'erreur
      return null; // Renvoyez null en cas d'erreur
  }
}
