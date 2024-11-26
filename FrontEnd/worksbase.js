//dans le terminal lancer la commande       node server.js  dans le dossier Backend

// fetch("http://localhost:5678/api/works").then((response)=>{
//     console.log('réponse de requete :', response) //permet la vérification de la requête dans la console.
// });

const gallery = document.querySelector('.gallery');

//pour ajouter un projet dans gallery
function affichageProjet(projet){
    gallery.innerHTML+='<article>' //+= permet d'jouter chaque nouveau projet au lieu de le remplacer
        + '<img src="'+ projet.imageUrl + '" alt="'+projet.title+'"/>'
        + '<figcaption>'+ projet.title+ '</figcaption>'
        +'</article>'
}


fetch("http://localhost:5678/api/works").then((response)=>{
    return response.json();
}).then((projets)=>{
    // console.log(projets);
    document.querySelector('.gallery').innerHTML="";  //efface les projets préccédents et permet de les mettre à jour
    projets.forEach(projet => {
        affichageProjet(projet);
    });
});

















//Note à moi meme
//on peut aussi utiliser ça dans la fonction affichageProjet
// const article = document.createElement('article');
// const image = document.createElement('img');
// image.src = projet.imageUrl;
// image.alt = projet.title;
// const figcaption = document.createElement('figcaption');
// figcaption.textContent = projet.title;
// article.appendChild(image);
// article.appendChild(figcaption);
// gallery.appendChild(article);

