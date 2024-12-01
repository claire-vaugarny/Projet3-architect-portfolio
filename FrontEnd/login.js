function loginUser(emailUser, passwordUser) {
    const dataLogin = {
        "email": emailUser,
        "password": passwordUser
    };

    // Retourne la promesse de fetch pour permettre à l'appelant d'attendre la réponse
    //et pas seulement fetch qui ne fait que la requête sans rien retourner
    return fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataLogin)
    })
    .then(response => {
        return response.json(); // Récupère la réponse en format JSON
    })
    .then(data => {
        console.log(data);  // Affiche les données de réponse
        return data;  // Retourne les données pour l'utiliser dans l'appelant
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





submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton submit

    // Récupérer les valeurs des champs
    const emailUser = document.getElementById('email').value;
    const passwordUser = document.getElementById('password').value;

    // Appel de la fonction loginUser et attendre la réponse
    const dataUserConnected = await loginUser(emailUser, passwordUser); // Attendre la réponse avant de continuer
    console.log(dataUserConnected);  // Affichage des données : devrait maintenant afficher les données de l'utilisateur

    if (dataUserConnected) {
        console.log('ici');
        window.localStorage.setItem("userData", JSON.stringify(dataUserConnected));  //enregistre l'utilisateur une fois connecté.
        window.location.href = 'index.html';  // Redirige vers index.html
    }
});
