function loginUser(emailUser, passwordUser) {
    const dataLogin = {
        "email": emailUser,
        "password": passwordUser
    };

    // Effectuer la requête fetch
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataLogin)
    })
    .then(response => {
        if (!response.ok) {
            // Si la réponse est une erreur HTTP (pas 2xx), lance une exception
            throw new Error('Erreur de connexion: ' + response.status);
        }
        return response.json(); // Récupère la réponse en format JSON
    })
    .then(data => {
        console.log(data);  // Affiche l'id et le token si il n'y a pas d'erreur
        return data;
    })
    .catch(error => {
        console.log('Erreur de requête:', error);  // Affiche l'erreur dans la console
        window.alert("Erreur dans l’identifiant ou le mot de passe");  // Affiche une alerte
    });
}

// Appel de la fonction avec les identifiants suivants pour tester
// loginUser('sophie.bluel@test.tld', 'S0phie');
// loginUser('string','string');
// loginUser('sophie.bluel@test.tld','string');




const submitBtn = document.getElementById('submit');

submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton submit

    // Récupérer les valeurs des champs
    const emailUser = document.getElementById('email').value;
    const passwordUser = document.getElementById('password').value;

    // Appel de la fonction loginUser et attendre la réponse
    const dataUserConnected = await loginUser(emailUser, passwordUser); // Attendre la réponse avant de continuer

    if (dataUserConnected) {
        console.log("Utilisateur connecté :", dataUserConnected);  // Affichage des données
        // Vous pouvez maintenant utiliser `dataUserConnected` pour d'autres actions
    }
});