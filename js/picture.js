import { apiBaseUrl } from "./config.js";

/*document.getElementById('new-trip_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
//    const fileInput = event.target.photo;
    const fileInput = document.getElementById('new-trip_photo');

    console.log(fileInput, fileInput.files, fileInput.files[0]);
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        console.log('COUCOU');

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

async function uploadImage(data) {
    try {
        const response = await fetch(`${apiBaseUrl}/upload`, {
            method: 'POST',
            body: data
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
*/
