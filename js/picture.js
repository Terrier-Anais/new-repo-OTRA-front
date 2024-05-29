import { apiBaseUrl } from "./config.js";

document.getElementById('new-trip_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fileInput = event.target.photo;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file instanceof Blob) {
            const formData = new FormData();

            const reader = new FileReader();
            reader.onload = function() {
                const base64Image = reader.result;
                formData.append('photo', base64Image);
                
                uploadImage(formData);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('The selected file is not valid.');
        }
    } else {
        console.error('No file selected.');
    }
});

async function uploadImage(formData) {
    try {
        const response = await fetch(`${apiBaseUrl}/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

