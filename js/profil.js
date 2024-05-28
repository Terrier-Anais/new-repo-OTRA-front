import { apiBaseUrl } from "./config.js";

async function loadProfile(userId) {
    try {
        const response = await fetch(`${apiBaseUrl}/profil/${userId}`);
        if (!response.ok) {
            console.error('Failed to fetch profile:', response);
            return;
        }
        const profile = await response.json();
        document.getElementById('lastname').value = profile.lastname;
        document.getElementById('firstname').value = profile.firstname;
        document.getElementById('username').value = profile.pseudo;
        document.getElementById('email').value = profile.email;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

async function updateProfile(userId) {
    const userData = {
        lastname: document.getElementById('lastname').value,
        firstname: document.getElementById('firstname').value,
        pseudo: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    if (userData.password !== document.getElementById('confirmation').value) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/profil/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            console.error('Failed to update profile:', response);
            return;
        }
        alert('Profil mis à jour avec succès');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}


async function deleteProfile(userId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre profil ?')) return;

    try {
        const response = await fetch(`${apiBaseUrl}/profil/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.error('Failed to delete profile:', response);
            return;
        }
        alert('Profil supprimé avec succès');

    } catch (error) {
        console.error('Error deleting profile:', error);
    }
}

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
}

document.getElementById('profilForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = getUserIdFromToken();
    updateProfile(userId);
});

document.getElementById('deleteProfileButton').addEventListener('click', () => {
  const userId = getUserIdFromToken();
    deleteProfile(userId);
});

document.addEventListener('DOMContentLoaded', () => {
  const userId = getUserIdFromToken();
    loadProfile(userId)
});
