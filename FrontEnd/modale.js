const containerModale = document.querySelector('.containerModale');
// let token = window.localStorage.getItem('token');
console.log("token : ",token);

// let projets = [];

// fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((data) => {
//         projets = data;
//         console.log("projets chargés pour la modale : ", projets);
//     })
//     .catch((error) => {
//         console.error("Erreur lors de la récupération des projets :", error);
//     });

// console.log("Touts les projets : ", projets);

// //lorsque l'on clique à coté de la modale, on vide la modale complètement
// containerModale.addEventListener('click', ()=>{
//     containerModale.innerHTML=""; 
// });


async function showProjetsModale(projets,token) {
    containerModale.innerHTML = ""; //vide la modale de son contenu précédent

    const modale = document.createElement('div');
    modale.classList="modale";
    
    //ajout bouton croix
    const btnClose = document.createElement('i');
    btnClose.classList = "fa-solid fa-xmark";
    btnClose.id = 'btnClose';
    modale.appendChild(btnClose);

    //au clique sur la croix, on vide le container de la modale complètement
    btnClose.addEventListener('click',()=>{
        containerModale.innerHTML="";
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
                    article.remove(); // Supprime l'article du DOM dans la modale
                } else {
                    console.error("Erreur lors de la suppression :", response.status);
                }
            })
        });
        containerProjetsModale.appendChild(article); //ajoute l'article dans la div
    });
    modale.appendChild(containerProjetsModale);
    //ajout du bouton Ajouter une photo
    const btnAddPhoto = document.createElement('button');
    btnAddPhoto.textContent = "Ajouter une photo";
    modale.appendChild(btnAddPhoto);

    containerModale.appendChild(modale);
}

// showProjetsModale(projets);

async function addProjetModale(projets) {
    containerModale.innerHTML = ""; //vide la modale de son contenu précédent

    const modale = document.createElement('div');
    modale.classList="modale";

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
        containerModale.innerHTML="";
    })

    //ajout "titre" de la modale
    const modaleTitle = document.createElement('p');
    modaleTitle.id = 'modaleTitle';
    modaleTitle.textContent = 'Ajout photo';
    modale.appendChild(modaleTitle);

    //ajout div pour la partie photo
    const containerAddPhoto = document.createElement('div');
    containerAddPhoto.classList = "containerAddPhoto";
    modale.appendChild(containerAddPhoto);

    const iconeImage = document.createElement('i');
    iconeImage.id = "fa-regular fa-image";
    containerAddPhoto.appendChild(iconeImage);
    
    const btnURLPhoto = document.createElement('button');
    btnURLPhoto.id = 'btnURLPhoto';
    btnURLPhoto.textContent = "+ Ajouter photo";
    containerAddPhoto.appendChild(btnURLPhoto);

    const textUnderBtn= document.createElement('p');
    textUnderBtn.id = 'textUnderBtn';
    textUnderBtn.textContent = "jpg, png : 4mo max";
    containerAddPhoto.appendChild(textUnderBtn);
    modale.appendChild(containerAddPhoto);

    //ajout du formulaire
            //le formulaire
    const formTitleCategory = document.createElement('form');
    formTitleCategory.classList = "formTitleCategory";
    formTitleCategory.method ="post";
    formTitleCategory.action ="#";

            //pour le titre
    const labelNewTitle = document.createElement('label');
    labelNewTitle.for="newTitle";
    formTitleCategory.appendChild(labelNewTitle);
    const inputNewTitle =document.createElement('input');
    inputNewTitle.id="newTitle";
    inputNewTitle.type = "text";
    formTitleCategory.appendChild(inputNewTitle);
            //pour le choix de la catégorie
    const labelNewCategory = document.createElement('label');
    labelNewCategory.for="titleCategory";
    formTitleCategory.appendChild(labelNewCategory);

    const select = document.createElement('select');
    select.id = "titleCategory";
    select.classList = "titleCategry";
    formTitleCategory.appendChild(select)

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
    btnSubmitNew.id="btnSubmitNew";
    btnSubmitNew.textContent = "Valider"
    formTitleCategory.appendChild (btnSubmitNew);
    modale.appendChild(formTitleCategory);
}

// addProjetModale()

