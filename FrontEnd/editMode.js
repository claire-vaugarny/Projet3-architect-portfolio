const LoginLogout = document.getElementById('LoginLogout');
const editMode = document.querySelector('.editMode');
const editMesProjets = document.querySelector('.editMesProjets');
const modifyMesProjets = document.querySelector('.modifyMesProjets');
// const menuFilters = document.querySelector('menuFilters');
const header = document.querySelector('.header');

const dataUserConnected = window.localStorage.getItem('userData');
console.log(dataUserConnected); //vérifie la connexion de l'utilisateur

if (dataUserConnected) {
    //l'utilisateur est connecté
    //transformation de la page Homepage en Homepage_edit
    LoginLogout.textContent = 'logout';

    editMode.classList.replace('hidden', 'active'); //bandeau noir
    header.classList.add('headerActive');
    editMesProjets.classList.replace('editMesProjets', 'editMesProjetsActive');
    modifyMesProjets.classList.replace('hidden', 'active'); //icone + 'moddifier'
    menuFilters.classList.replace('active', 'hidden'); //filtres
} else {
    //l'utilisateur est déconnecté
    //transformation de la page Homepage_edit en Homepage
    LoginLogout.textContent = 'login'

    editMode.classList.replace('active', 'hidden'); //bandeau noir
    header.classList.remove('headerActive');
    editMesProjets.classList.replace('editMesProjets', 'editMesProjetsActive');
    modifyMesProjets.classList.replace('active', 'hidden'); //icone + 'moddifier'
    menuFilters.classList.replace('hidden', 'active'); //filtres


};


LoginLogout.addEventListener('click', function () {
    console.log("clique réussi");
    if (LoginLogout.textContent === 'logout') {
        //si l'utilisateur se déconnecte alors on efface ses données du local storage
        window.localStorage.clear(); //valide dans le cas d'un seul utilisateur comme c'est notre cas ici
        location.reload(); //recharge la page après l'effacement des données
    } else {
        window.location.href = './login.html';  // Redirige vers la page de connexion
    }
});


// Note à moi même
//le header reste affiché, on ne modifie donc pas la classe .active ou .hidden
//on lui donne une autre classe pour ses modifications headerActive (ou on l'enlève)
//de meme pour editMesProjets

//le rechargement de la page après l'effacement des données permet de remettre à jour la page en Homepage et non pas resté en Homepage_edit
