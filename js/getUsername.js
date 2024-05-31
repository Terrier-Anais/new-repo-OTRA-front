// On récupère l'utilisateur connecté en utilisant l'API
const getToken = () => {
    return localStorage.getItem('token');
      };
      getToken();
      
// fonction pour récupérer l'ID de l'utilisateur à partir du token
function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      return payload.id;
  } catch (e) {
      console.error('Failed to decode token', e);
      return null;
  }
}

// fonction pour récupérer l'username de l'utilisateur à partir de son ID 
async function getUsernameFromId(userId) {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  const user = await response.json();
  console.log(user);  
}

const userId = getUserIdFromToken();
getUsernameFromId(userId);

const welcome = document.querySelector('#pseudo');
welcome.textContent = `Bienvenue ${user.username} !`;

