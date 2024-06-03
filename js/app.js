// script span connection

const connect = document.getElementById('connection');
connect.addEventListener('click', () => {
    window.location.href = 'login.html';
});

//script span registration

const register = document.getElementById('registration');
register.addEventListener('click', () => {
    window.location.href = 'signin.html';
});

//script back homepage on logo title

const titleLogo = document.querySelector('.left');
titleLogo.addEventListener('click', () => {
    window.location.href = 'home.html';
});


