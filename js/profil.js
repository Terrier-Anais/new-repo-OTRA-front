
export async function getProfil(userId){
    try{
        const httpResponse = await fetch(`http://localhost:3000/api/profil/${userId}`);
        if (! httpResponse.ok) { 
            console.log(httpResponse);
            return null;
          }
          const profil = await httpResponse.json(); 
          return profil;
        } catch (error) {
          console.error(error); 
          return null; 
        }
      };
      export async function updateList(userId, userData) {
        try {
          const httpResponse = await fetch(`http://localhost:3000/api/profil/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
          });
        
          if (!httpResponse.ok) {
            console.log(httpResponse);
            return null;
          }
        
          const updatedProfil = await httpResponse.json();
          return updatedProfil;
      
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      
      export async function deleteProfil(userId) {
        try {
          const httpResponse = await fetch(`http://localhost:3000/api/profil/${userId}`, { 
            method: "DELETE"
          });
        
          if (! httpResponse.ok) {
            console.error(httpResponse);
            return false;
          }
        
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
