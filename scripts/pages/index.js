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

async function displayData(photographers) {
    //recuperation de la div
    const photographersSection = document.querySelector(".photographer_section");

    //pour chaque photographe on le crée via la factory + on remplit sa card et on l ajout dans la page
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const {photographers, media} = await getPhotographers();

    //crée et affiche les photographes
    displayData(photographers);
}
init();