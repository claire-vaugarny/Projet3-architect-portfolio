// fetch("http://localhost:5678/api/works").then((response)=>{
//     console.log('réponse de requete :', response) //permet la vérification de la requête dans la console.
// });

const gallery = document.querySelector('.gallery');
const menuFilters = document.querySelector('.menuFilters');

//pour ajouter un projet dans gallery
function affichageProjet(projet){
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

//pour ajouter un filter dans .menuFilter
function affichageFiltre(filter){
    const li = document.createElement('li');
    li.textContent=filter;
    menuFilters.appendChild(li)
}

// affichage des projets en fonction de category donné
function afficherProjetsFiltres(projets, category) {
    gallery.innerHTML=""; //efface les projets précédents
    // Filtrer les projets dont la catégorie correspond à category.name
    const projetsFiltres = projets.filter(projet => projet.category.name === category);

    // Utiliser la fonction affichageProjet() pour afficher chaque projet filtré
    projetsFiltres.forEach(projet => {
        affichageProjet(projet);  // Appelle ta fonction d'affichage pour chaque projet
    });
}



fetch("http://localhost:5678/api/works").then((response)=>{
    return response.json();
}).then((projets)=>{
    console.log(projets);

    const categories = projets.map(projet=>projet.category.name) //création du tableau avec toutes les catégories avec doublons
    let categorieSansDoublons = new Set(categories); //création du set sans doublons
    let categoriesAvecTous = ['Tous', ...Array.from(categorieSansDoublons)]; //transforme leSet en tableau et ajoute la catégorie Tous
    console.log(categoriesAvecTous);

    //affichage des filtres récupérés
    menuFilters.innerHTML=""; //efface les filtres précédents
    categoriesAvecTous.forEach(filter=>{
        affichageFiltre(filter); //affiche tous les filtres mis à jour
    })
    
    //affichage de tous les projets
    gallery.innerHTML="";  //efface les projets précédents
    projets.forEach(projet => {
        affichageProjet(projet); //affiche tous les projets mis à jour

        // afficherProjetsFiltres(projets,"Hotels & restaurants")
        // afficherProjetsFiltres(projets,"Objets")
        // afficherProjetsFiltres(projets,"Appartements")
    });

    //affichage des projets au clique de chaque catégorie
    menuFilters.addEventListener('click', (event) => {
        //récupère la catégorie
        const selectedCategory = event.target.textContent;
        
        if (selectedCategory === 'Tous') {
            gallery.innerHTML = "";  // Vider la galerie
            projets.forEach(projet => {
                affichageProjet(projet);  // Afficher tous les projets
            });
        } else {
            afficherProjetsFiltres(projets, selectedCategory);  // Afficher les projets filtrés par catégorie
        }
    });
});




//Note à moi meme
//on peut aussi utiliser ça dans la fonction affichageProjet mais modifier le DOM peut entrainer des problèmes de comportement par la suite
//notamment si on ajoute un évènement dessus comme c'est le cas pour les filtres
// gallery.innerHTML+='<article>' //+= permet d'jouter chaque nouveau projet au lieu de le remplacer
// + '<img src="'+ projet.imageUrl + '" alt="'+projet.title+'"/>'
// + '<figcaption>'+ projet.title+ '</figcaption>'
// +'</article>'

//pourquoi on n'a pas besoin de preventDefault ?
//<button type="submit"> et que tu veux empêcher l'envoi du formulaire, tu ajouterais event.preventDefault() à cet événement.
//Le clic sur un <li> ne déclenche aucune action par défaut.
