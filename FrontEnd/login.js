


// Appel de la fonction avec les identifiants suivants pour tester
// loginUser('sophie.bluel@test.tld', 'S0phie');
// loginUser('string','string');
// loginUser('sophie.bluel@test.tld','string');



const token = window.localStorage.getItem("token");

if(token){
    window.location.href = "./index.html";
}

submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton submit

    // Récupérer les valeurs des champs
    const emailUser = document.getElementById('email').value;
    const passwordUser = document.getElementById('password').value;

    // Appel de la fonction loginUser et attendre la réponse
    const dataLogin = {
        "email": emailUser,
        "password": passwordUser
    };

    // Retourne la promesse de fetch pour permettre à l'appelant d'attendre la réponse
    //et pas seulement fetch qui ne fait que la requête sans rien retourner
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataLogin)
    })
    .then(response => {
        console.log(response);
        if (response.ok){
            return response.json(); // Récupère la réponse en format JSON
        }else{
            console.log('Erreur de requête:', error);  // Affiche l'erreur dans la console
            return window.alert("Erreur dans l’identifiant ou le mot de passe");  // Affiche une alerte    
        }
    })
    .then(data => {
        console.log(data);  // Affiche les données de réponse
        window.localStorage.setItem('token',data.token);
        window.location.href = "./index.html";
    })
    .catch(error => {
        console.log('Erreur de requête:', error);  // Affiche l'erreur dans la console
        window.alert("Erreur dans l’identifiant ou le mot de passe");  // Affiche une alerte
    });

});
