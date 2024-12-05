const submitBtn = document.getElementById('submit');
const token = window.localStorage.getItem("token");

if(token){
    window.location.href = './index.html';  // Redirige vers index.html si l'utilisateur est déjà connecté
}

submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton submit
    
    // Récupérer les valeurs des champs
    const emailUser = document.getElementById('email').value;
    const passwordUser = document.getElementById('password').value;
    
    const dataLogin = {
        "email": emailUser,
        "password": passwordUser
    };
    
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataLogin)
    })
    .then(response => {
        console.log("reponse de l'API", response);
        if(response.ok){
            return response.json(); // Récupère la réponse en format JSON
        }else{
            window.alert("Erreur dans l’identifiant ou le mot de passe");  // Affiche une alerte pour l'utilisateur        
        }
    })
    .then(data => {
        console.log(data);  // Affiche les données de réponse
        window.localStorage.setItem("token",data.token);  //enregistre le token de l'utilisateur une fois connecté.
        window.location.href = './index.html';  // Redirige vers index.html car l'utilisateur est connecté
    })
    .catch(error => {
        console.log('Erreur de requête:', error);  // Affiche l'erreur dans la console
        window.alert("Erreur dans l’identifiant ou le mot de passe");  // Affiche une alerte pour l'utilisateur        
    });
});
