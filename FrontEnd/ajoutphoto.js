async function afficheCategoriesModale() {
    fetch('http://localhost:5678/api/categories')
        .then(response => {
            return response.json();
        })
        .then(categories => {
            categoriesProjet.innerHTML = ''; // Vide les catégories précédentes
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                if (category.id === 1) {
                    option.selected = true; // Ajoute l'attribut selected
                }
                option.textContent = category.name;
                categoriesProjet.appendChild(option);
            });
        })
        .catch(error => { // Corrigé ici
            console.log("Erreur lors de l'affichage des catégories :", error);
        });
}


afficheCategoriesModale();