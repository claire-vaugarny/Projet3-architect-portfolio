//dans le terminal lancer la commande       node server.js  dans le dossier Backend

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
    //récupère les filtres, creer un nouveau tableau sans doublons
    const categories = projets.map(projet=>projet.category.name) //création du tableau avec toutes les catégories
    const categorieSansDoublons =['Tous']; //ajout de Tous car le filtre n'existe pas dans les catégories dans json
    categories.forEach(categorie=>{
        if (!categorieSansDoublons.includes(categorie)){categorieSansDoublons.push(categorie)}
    }) 
    console.log(categorieSansDoublons);

    //affichage des filtres récupérés
    menuFilters.innerHTML=""; //efface les filtres précédents
    categorieSansDoublons.forEach(filter=>{
        affichageFiltre(filter); //affiche tous les filtres mis à jour
    })
    

    //affichage de tous les projets
    gallery.innerHTML="";  //efface les projets précédents
    projets.forEach(projet => {
        affichageProjet(projet); //affiche tous les projets mis à jour

        afficherProjetsFiltres(projets,"Hotels & restaurants")
        afficherProjetsFiltres(projets,"Objets")
        afficherProjetsFiltres(projets,"Appartements")
    });
});













//Note à moi meme
//on peut aussi utiliser ça dans la fonction affichageProjet mais modifier le DOM peut entrainer des problèmes de comportement par la suite
// gallery.innerHTML+='<article>' //+= permet d'jouter chaque nouveau projet au lieu de le remplacer
// + '<img src="'+ projet.imageUrl + '" alt="'+projet.title+'"/>'
// + '<figcaption>'+ projet.title+ '</figcaption>'
// +'</article>'




