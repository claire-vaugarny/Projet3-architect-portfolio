//Remarque : la gestion de l'affichage des projets en fonction de la connexion de l'utilsateur a été géré dans Homepage.js

const editMode = document.querySelector('.editMode'); //pour bandeau noir
const editMesProjets = document.querySelector('.editMesProjets'); //pour l'icone et le texte "modifier"
const header = document.querySelector('.header');
const containerModale = document.querySelector('.containerModale');

if (token) {
    affichageEditMode();
} else {
    affichageHomepage();
}

function affichageEditMode() {
    editMode.innerHTML = ''; //vide le précédent

    //créer les éléments du bandeau noir
    const iconePen = document.createElement('i');
    iconePen.classList = "fa-regular fa-pen-to-square";
    editMode.appendChild(iconePen);
    const pBandeau = document.createElement('p');
    pBandeau.textContent = "Mode édition";
    editMode.appendChild(pBandeau);

    //pour décaler le header par css
    header.classList.add('headerActive');

    //créer les éléments icone + "modifier"
    const modifyMesProjets = document.createElement('div');
    modifyMesProjets.classList = "modifyMesProjets";
    const iconePen2 = document.createElement('i');
    iconePen2.classList = "fa-regular fa-pen-to-square";
    modifyMesProjets.appendChild(iconePen2);
    const pModifier = document.createElement('p');
    pModifier.textContent = "modifier";
    modifyMesProjets.appendChild(pModifier);
    editMesProjets.appendChild(modifyMesProjets);

    //pour aligner les éléments dans editMesProjets
    editMesProjets.style.display = "flex";
    editMesProjets.style.alignItems = "center";

    //click sur modifier, on affiche la modale
    modifyMesProjets.addEventListener('click',()=>{
        containerModale.style.height="100vh";
        showProjetsModale(projets,token);
    });
}


function affichageHomepage() {
    editMode.innerHTML = ''; //supprime le contenu du bandeau noir
    editMode.style.height = 0; //pour 'cacher' le ruban noir

    //pour enlever le décalage du header
    header.classList.remove('headerActive');

    //pour supprimer icone + "modifier"
    editMesProjets.innerHTML='';
    const h2 = document.createElement('h2');
    h2.textContent="Mes Projets";
    editMesProjets.appendChild(h2);

    //remettre editMesProjets initialement
    editMesProjets.style.display = "block";
    editMesProjets.style.alignItems = "";  // Réinitialise la propriété alignItems à sa valeur par défaut
}

