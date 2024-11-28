const LoginLogout = document.getElementById('LoginLogout');
const editMode = document.getElementById('editMode');
const editMesProjets = document.getElementById('editMesProjets');
const modifyMesProjets = document.getElementById('modifyMesProjets');
const menuFilters = document.getElementById('menuFilters');
const header = document.querySelector('header');

const dataUserConnected = window.localStorage.getItem('userData');

if (dataUserConnected) {
    //l'utilisateur est connecté
    //transformation de la page en Homepage_edit
    LoginLogout.textContent = 'logout';

    header.classList.add('headerActive');
    menuFilters.classList.replace('active', 'hidden');
    editMode.classList.replace('hidden', 'active');
    editMesProjets.classList.replace('editMesProjets','editMesProjetsActive');
    modifyMesProjets.classList.replace('hidden', 'active');

    //si l'utilisateur se déconnecte alors on efface ses données du local storage
    LoginLogout.addEventListener("click", async (event) => {
        window.localStorage.clear(); //valide dans le cas d'un seul utilisateur comme c'est notre cas ici
    });
} else {
    //l'utilisateur est déconnecté
    //transformation de la page en Homepage
    LoginLogout.textContent = 'login'

    //si l'utilisateur veut se conecter au clique sur login il est envoyé sur la page de connexion
    LoginLogout.addEventListener('click', function () {
        header.classList.remove('headerActive');
        menuFilters.classList.replace('hidden', 'active');
        editMode.classList.replace('active', 'hidden');
        editMesProjets.classList.replace('editMesProjetsActive','editMesProjets');
        modifyMesProjets.classList.replace('active', 'hidden');

        window.location.href = 'login.html';  // Redirige vers la page de connexion
    });
}



// Note à moi même
//le header reste affiché, on ne modifie donc pas la classe .active ou .hidden
//on lui donne une autre classe pour ses modifications headerActive (ou on l'enlève)
//de meme pour editMesProjets
