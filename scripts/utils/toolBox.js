async function getPhotographers() {
    //on requete le fichier JSON
    return fetch("data/photographers.json").then(function (response) {
        //si la repônse es OK
        if (response.ok) {
            //on recupere le JSON et on le retourne
            return response.json().then(function (data) {
                return data;
            });
        } else {
            //sinon on affiche un message dans la console
            console.log('Mauvaise réponse du réseau');
        }
    });
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


export {getPhotographers, displayModal, closeModal};