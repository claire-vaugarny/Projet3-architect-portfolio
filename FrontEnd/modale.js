const modale = document.querySelector('.modale');


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
        leftArrow.addEventListener('click', async (event) => {
            event.stopPropagation(); // Empêche la propagation pour ne pas fermer la modale au clic du bouton

            // Chargement des projets pour prendre en compte les projets ajoutés
            const response = await fetch("http://localhost:5678/api/works");
            const works = await response.json();
            await showProjetsModale(works);
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

            //pour l'image
    let selectedFile = null;
    const inputURLPhoto = document.createElement('input');
    inputURLPhoto.name = "NewURL"
    inputURLPhoto.type = 'file'
    inputURLPhoto.accept = 'image/jpg, image/png'; // Accepte les fichiers JPG et PNG uniquement
    inputURLPhoto.required = true ;
    inputURLPhoto.className = "displayNone";
    containerAddPhoto.appendChild(inputURLPhoto);
    inputURLPhoto.addEventListener('change', (event) => {
        event.preventDefault();
        selectedFile = addPhoto(inputURLPhoto,containerAddPhoto,btnURLPhoto,textUnderBtn,iconeImage)
    });

    const btnURLPhoto = document.createElement('button');
    btnURLPhoto.type = "button";
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

    const NewTitle =document.createElement('input');
    NewTitle.type = "text";
    NewTitle.id = "NewTitle"
    NewTitle.name = "NewTitle"
    form.appendChild(NewTitle);

            //pour le choix de la catégorie
    const labelNewCategory = document.createElement('label');
    labelNewCategory.for="titleCategory";
    labelNewCategory.textContent = "Catégorie";
    form.appendChild(labelNewCategory);

    const select = document.createElement('select');
    select.id = "select";
    select.name = "NewCategory";
    select.required = true;
    form.appendChild(select)

    //première option vide, sélectionnée par défaut, ne peut pas être rechoisi après un changement
    const option = document.createElement('option');
    option.value="";
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);
    //ajoute une option pour chaque catégorie récupérée par l'API
    fetch('http://localhost:5678/api/categories') 
    .then((response) => response.json())
    .then((data) => {
        categories = data;
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
    btnSubmitNew.classList.add('inactiveButton');
    btnSubmitNew.textContent = "Valider";
    modale.appendChild (btnSubmitNew);

    
    // Écouteur d'événement sur les 3 champs du formulaire. Si les 3 sont remplis, alors on change le bouton "Valider"
    inputURLPhoto.addEventListener('change', () => {checkFieldsFilled(inputURLPhoto);});
    NewTitle.addEventListener('input', () => {checkFieldsFilled(inputURLPhoto);});
    select.addEventListener('change', () => {checkFieldsFilled(inputURLPhoto);});

    btnSubmitNew.addEventListener('click',(event)=>{
        event.preventDefault();
        //véfication que l'input contient une image
        if (!selectedFile) {
            window.alert("Veuillez sélectionner une image.");
            return;
        }
        // Vérification de la catégorie et du titre
        const NewTitleValue = String(NewTitle.value);
        const selectValue = select.value;   
        if (NewTitleValue === "" || selectValue === "") {
            window.alert("Veuillez remplir tous les champs.");
            return;
        }

        const formData = new FormData();
        // const fileUrl = URL.createObjectURL(selectedFile);
        formData.append("image",selectedFile);
        formData.append("title",NewTitleValue);
        formData.append("category",selectValue);
        
        fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` //ajoute le token d'identification
            },
            body: formData
        })
        .then(response =>response.json())
        .then(data =>{
            addProjetModale(projets);
            loadProjets();
        })
        .catch(error =>{
            console.log('Erreur:' ,error);
        })
    })
}


function deleteProjet(projet){
    fetch(`http://localhost:5678/api/works/${projet.id}`, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*', // Indique que tout type de contenu est accepté
            'Authorization': `Bearer ${token}`, //ajoute le token d'identification
        }
    })
    .then(async(response) => {
        if (response.ok) {
            await loadProjets();
            showProjetsModale(projets); //mise à jour de l'affichage de la modale
        } else {
            console.error("Erreur lors de la suppression :", response.status);
        }
    })
    .catch(error => {
        console.error('Erreur réseau lors de la suppression du projet:', error);
    })
}

function addPhoto(inputURLPhoto,containerAddPhoto,btnURLPhoto,textUnderBtn,iconeImage){
    const selectedFile = inputURLPhoto.files[0];
    if(!selectedFile){
        window.alert("Vous n'avez pas sélectionner d'image.");
        return; //arrete la fonction
    }
    // Vérification de la taille de l'image (4Mo = 4 * 1024 * 1024 octets)
    const maxSize = 4 * 1024 * 1024; // 4 Mo
    if (selectedFile.size > maxSize) {
    window.alert("L'image sélectionnée est trop grande. Veuillez choisir une image de moins de 4 Mo.");
    return; // Arrête la fonction si l'image est trop grande
    }
    
    //sinon on peut créer l'image dans le DOM
    const fileUrl = URL.createObjectURL(selectedFile);
    const img = document.createElement('img');
    img.src=fileUrl;
    img.alt="apercu de l'image";
    containerAddPhoto.appendChild(img);
    // Révoquer l'URL temporaire une fois l'image ajoutée
    img.onload = function() {
        URL.revokeObjectURL(fileUrl); // Révoquer l'URL après le chargement de l'image
    }
    //cache les autres éléments du container
    iconeImage.style.display = 'none'
    btnURLPhoto.style.display = 'none';
    textUnderBtn.style.display = 'none';
    inputURLPhoto.style.display ='none';

    return selectedFile;
    
}

//vérifie si les 3 champs du formulaire sont remplis et modifie le bouton "Valider" en conséquence
function checkFieldsFilled(inputURLPhoto) {
    const imageSelect = inputURLPhoto.files[0];

    if (NewTitle.value && select.value&&imageSelect){
        console.log("3 champs remplis");
        btnSubmitNew.classList.add('activeButton');
        btnSubmitNew.classList.remove('inactiveButton');
    }else{
        btnSubmitNew.classList.add('inactiveButton');
        btnSubmitNew.classList.remove('activeButton');
    }
}