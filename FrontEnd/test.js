const modale = document.querySelector('.modale');
// console.log("token : ",token);


async function showProjetsModale(projets,token) {
    modale.innerHTML = ""; //vide la modale de son contenu précédent

    //ajout bouton croix
    const btnClose = document.createElement('i');
    btnClose.classList = "fa-solid fa-xmark";
    btnClose.id = 'btnClose';
    modale.appendChild(btnClose);

    //au clique sur la croix, on vide le container de la modale complètement et on cache le container
    btnClose.addEventListener('click',()=>{
        modale.innerHTML="";
        containerModale.style.height="0";
    })
    //idem au clique sur l'overlay
    containerModale.addEventListener('click',(event)=>{
        // Vérifier si le clic a eu lieu en dehors de la modale
        if (!modale.contains(event.target)) {
            modale.innerHTML="";
            containerModale.style.height="0";
        }
    })
    //ajout "titre" de la modale
    const modaleTitle = document.createElement('p');
    modaleTitle.id = 'modaleTitle';
    modaleTitle.textContent = 'Galerie photo';
    modale.appendChild(modaleTitle);
    
    //ajout de chaque projet un à un avec l'icone poubelle dont le click supprime le projet
    const containerProjetsModale = document.createElement('div');
    containerProjetsModale.classList="containerProjetsModale";
    projets.forEach(projet => {
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.src = projet.imageUrl;
        img.alt = projet.title;
        article.appendChild(img);
        
        const btnTrash = document.createElement('i');
        btnTrash.classList.add("fa-solid", "fa-trash-can");
        //si l'on clique sur l'icone trash, on supprime le projet de l'API et de l'affichage dans la modale
        btnTrash.addEventListener("click", () => {
            deleteProjet(projet);
        });
        article.appendChild(btnTrash);
        containerProjetsModale.appendChild(article); //ajoute l'article dans la div
    });
    modale.appendChild(containerProjetsModale);
    //ajout du bouton Ajouter une photo
    const btnAddPhoto = document.createElement('button');
    btnAddPhoto.id = "btnAjoutPhoto";
    btnAddPhoto.textContent = "Ajouter une photo";
    modale.appendChild(btnAddPhoto);
    btnAddPhoto.addEventListener('click',(event)=>{
        event.stopPropagation(); //empèche la propagation pour ne pas "fermer" la modale au clique du bouton
        addProjetModale(projets);
    })

}

async function addProjetModale(projets) {
    modale.innerHTML = ""; //vide la modale de son contenu précédent

    //ajout flèche gauche
    const leftArrow = document.createElement('i');
    leftArrow.classList = "fa-solid fa-arrow-left";
    leftArrow.id = "leftArrow";
    modale.appendChild(leftArrow);

        //Au clique sur la flèche gauche, on revient à la "première modale"  
        leftArrow.addEventListener('click', () => {
            showProjetsModale(projets);
        });

    //ajout bouton croix
    const btnClose = document.createElement('i');
    btnClose.classList = "fa-solid fa-xmark";
    btnClose.id = 'btnClose';
    modale.appendChild(btnClose);

    //au clique sur la croix, on vide le container de la modale complètement
    btnClose.addEventListener('click',()=>{
        modale.innerHTML="";
        containerModale.style.height="0";
    })

    //ajout "titre" de la modale
    const modaleTitle = document.createElement('p');
    modaleTitle.id = 'modaleTitle';
    modaleTitle.textContent = 'Ajout photo';
    modale.appendChild(modaleTitle);

    //ajout du formulaire
            //le formulaire
    const form = document.createElement('form');
    form.classList = "form";
    form.action ="#";
    form.method ="post";
    modale.appendChild(form)
    //ajout div pour la partie photo
    const containerAddPhoto = document.createElement('div');
    containerAddPhoto.classList = "containerAddPhoto";
    form.appendChild(containerAddPhoto);

    const iconeImage = document.createElement('i');
    iconeImage.classList = "fa-regular fa-image";
    iconeImage.id='iconeImage'
    containerAddPhoto.appendChild(iconeImage);
    
    const inputURLPhoto = document.createElement('input');
    inputURLPhoto.name = "NewURL"
    inputURLPhoto.type = 'file'
    inputURLPhoto.accept = 'image/jpg, image/png'; // Accepte les fichiers JPG et PNG uniquement
    inputURLPhoto.required = true ;
    // inputURLPhoto.style.display = 'none'; //on ne peut pas le modifier directement donc on va le cacher et utiliser un bouton "classique"
    containerAddPhoto.appendChild(inputURLPhoto);
    inputURLPhoto.addEventListener('change', (event) => {
        event.preventDefault();
        console.log('la')
        addPhoto(inputURLPhoto,containerAddPhoto,btnURLPhoto,textUnderBtn,iconeImage)
    });

    const btnURLPhoto = document.createElement('button');
    btnURLPhoto.id = 'btnURLPhoto';
    btnURLPhoto.textContent = "+ Ajouter photo";
    btnURLPhoto.addEventListener('click', (event) => {
        event.preventDefault;
        inputURLPhoto.click(); // Clique sur l'input caché
    });
    containerAddPhoto.appendChild(btnURLPhoto);

    const textUnderBtn= document.createElement('p');
    textUnderBtn.id = 'textUnderBtn';
    textUnderBtn.textContent = "jpg, png : 4mo max";
    containerAddPhoto.appendChild(textUnderBtn);

            //pour le titre
    const labelNewTitle = document.createElement('label');
    labelNewTitle.for="newTitle";
    labelNewTitle.textContent = "Titre"
    form.appendChild(labelNewTitle);

    const inputNewTitle =document.createElement('input');
    inputNewTitle.type = "text";
    inputNewTitle.name = "NewTitle"
    // inputNewTitle.required = true;
    form.appendChild(inputNewTitle);

            //pour le choix de la catégorie
    const labelNewCategory = document.createElement('label');
    labelNewCategory.for="titleCategory";
    labelNewCategory.textContent = "Catégorie";
    form.appendChild(labelNewCategory);

    const select = document.createElement('select');
    select.name = "NewCategory";
    // select.required = true;
    form.appendChild(select)

    fetch('http://localhost:5678/api/categories') //ajoute une option pour chaque catégorie récupérée par l'API
    .then((response) => response.json())
    .then((data) => {
        categories = data;
        console.log("catégories chargées pour la modale : ", categories);
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value=category.id;
            option.textContent=category.name;
            select.appendChild(option);
        });
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
    });

    const btnSubmitNew = document.createElement('button');
    btnSubmitNew.type="submit";
    btnSubmitNew.form="form"; //lier à l'id du formulaire m^me s'il n'est pas dedans
    btnSubmitNew.id="btnSubmitNew";
    btnSubmitNew.textContent = "Valider"
    modale.appendChild (btnSubmitNew);
}


function deleteProjet(projet){
    console.log(`Icône cliquée, ID du projet : ${projet.id}`);
    fetch(`http://localhost:5678/api/works/${projet.id}`, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*', // Indique que tout type de contenu est accepté
            'Authorization': `Bearer ${token}`, //ajoute le token d'identification
        }
    })
    .then(response => {
        if (response.ok) {
            console.log(`Projet ${projet.id} supprimé avec succès.`);
            console.log("projets avant suppression",projets)
            const index = projets.findIndex(element => element.id === projet.id );
            projets.splice(index,1);  //supprime le projet de tous les projets
            console.log("projets après suppression",projets)
            
            showProjetsModale(projets,token); //mise à jour de l'affichage de la modale
        } else {
            console.error("Erreur lors de la suppression :", response.status);
        }
    })
    .catch(error => {
        console.error('Erreur réseau lors de la suppression du projet:', error);
    })
}

function addPhoto(inputURLPhoto,containerAddPhoto,btnURLPhoto,textUnderBtn,iconeImage){
    console.log('ici');
    //creer l'URL temporaire de l'image
    const selectedFile = inputURLPhoto.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    //créer l'image dans le DOM
    const img = document.createElement('img');
    img.src=fileUrl;
    img.alt="apercu de l'image";
    containerAddPhoto.appendChild(img);
    // Révoquer l'URL temporaire une fois l'image ajoutée
    // URL.revokeObjectURL(fileUrl);
    //cache les autres éléments du container
    iconeImage.style.display = 'none'
    btnURLPhoto.style.display = 'none';
    textUnderBtn.style.display = 'none';
    inputURLPhoto.style.display ='none';
    
}

