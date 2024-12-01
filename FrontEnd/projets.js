// fetch("http://localhost:5678/api/works").then((response)=>{
//     console.log('réponse de requete :', response) //permet la vérification de la requête dans la console.
// });


            //affichage des projets dans la galerie et gestion des filtres

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
    deleteGallery.innerHTML="";

    projets.forEach(projet => {
        affichageProjet(projet); //affiche tous les projets mis à jour
        // afficherProjetsFiltres(projets,"Hotels & restaurants")
        // afficherProjetsFiltres(projets,"Objets")
        // afficherProjetsFiltres(projets,"Appartements")


            //pour la modale
        affichageProjetModale(projet);
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



                //affichage de la modale et gestion des boutons

//pour optimier, on n'utilise qu'un seul fetch, au dessus, la fonction sera donc appelée au dessus
function affichageProjetModale(projet){
    const article = document.createElement('article');
    article.classList.add('deleteCard');
    deleteGallery.appendChild(article);

    const image = document.createElement('img');
    image.src = projet.imageUrl;
    image.alt = projet.title;
    article.appendChild(image);

    const icone = document.createElement('i');
    icone.classList.add("fa-solid", "fa-trash-can");
    icone.id = `idProjet-${parseInt(projet.id)}`;
    article.appendChild(icone);

        // Au clic sur l'icône poubelle, on recupère l'id du projet pour ensuite le supprimer de l'API
        icone.addEventListener('click', function() {
            const idProjet = parseInt(icone.id.split('-')[1]); // Extrait l'ID du projet
            console.log(`Icône cliquée, ID du projet : ${idProjet}`);
            fetch(`http://localhost:5678/api/works/${idProjet}`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*', // Indique que tout type de contenu est accepté
                    'Authorization':`Bearer ${dataUserConnected.token}`, //ajoute le token d'identification
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log(`Projet ${idProjet} supprimé avec succès.`);
                    article.remove(); // Supprime l'article du DOM dans la modale
                } else {
                    console.error("Erreur lors de la suppression :", response.status);
                }
            })
        });
}



