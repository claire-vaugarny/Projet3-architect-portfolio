const gallery = document.querySelector('.gallery');
const menuFilters = document.querySelector('.menuFilters');
const token = window.localStorage.getItem("token");
//Remarque : on redéfini token meme s'il est défini sur login.js car ce fichier est lié uniquement à la page login.html

let projets = [];

async function loadProjets() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        projets = await response.json();
        gallery.innerHTML="";
        // Afficher tous les projets au chargement de la page
        projets.forEach(projet => {
            affichageProjet(projet);
        });

        gestionDesFiltres(projets); // Créer et afficher les filtres après avoir chargé les projets
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
    }
}


loadProjets(); // Appel de la fonction pour charger les projets


//pour ajouter 1 projet dans gallery
function affichageProjet(projet) {
    const article = document.createElement('article');
    gallery.appendChild(article);
    const image = document.createElement('img');
    image.src = projet.imageUrl;
    image.alt = projet.title;
    article.appendChild(image);
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = projet.title;
    article.appendChild(figcaption);
}

// affichage des projets en fonction de category donné
function afficherProjetsFiltres(projets, category) {
    gallery.innerHTML = ""; //efface les projets précédents

    const projetsFiltres = projets.filter(projet => projet.category.name === category); // Filtre les projets dont la catégorie correspond à category.name
    projetsFiltres.forEach(projet => {
        affichageProjet(projet);
    });
}


//si l'utilisateur n'est pas connecté on affiche les filtres.
//sinon on ne les affiche pas.
function gestionDesFiltres(projets) {
    if (!token){
        //affichage des filtres et affichage des projets correspondants au clique d'une catégorie
        const categories = projets.map(projet => projet.category.name) //création du tableau avec toutes les catégories avec doublons
        let categorieSansDoublons = new Set(categories); //création du set sans doublons
        let categoriesAvecTous = ['Tous', ...Array.from(categorieSansDoublons)]; //transforme leSet en tableau et ajoute la catégorie Tous

        menuFilters.innerHTML = ""; //efface les filtres précédents
        categoriesAvecTous.forEach(filter => {
            //affichage des filtres
            const li = document.createElement('li');
            li.textContent = filter;
            menuFilters.appendChild(li);

            li.addEventListener('click', (event) => {

                if (filter === 'Tous') {
                    gallery.innerHTML = "";  // Vider la galerie
                    projets.forEach(projet => {
                        affichageProjet(projet);  // Afficher tous les projets
                    });
                } else {
                    afficherProjetsFiltres(projets, filter);  // Afficher les projets filtrés par catégorie
                }
            });
        });
    }else{
        menuFilters.innerHTML = "";
    }
}



/////////connexion à la page login.html au clique sur login
const LoginLogout = document.getElementById('LoginLogout');

//affichage de login ou logout en fonction de l'état de connexion de l'utilsateur
if(token){
    LoginLogout.textContent = "logout";
}else{
    LoginLogout.textContent = "login";
};

LoginLogout.addEventListener('click',()=>{
    const tokenForLogin =window.localStorage.getItem('token');
    if (!tokenForLogin){
        window.location.href = './login.html'; //redirige vers la page de connexion si l'utilisateur est déconnecté
    }else{
        localStorage.clear(); //supprime le token du localStroage et donc "déconnecte" l'utilisateur. faisable ici avec clear() car il n'y qu'un seul utilisateur
        LoginLogout.textContent = "login";

    
        // window.location.href = './index.html'; 

        affichageHomepage(); //recharge la page après l'effacement des données
    }
});