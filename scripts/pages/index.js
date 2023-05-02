import {getPhotographers, navigationClavier} from "../utils/toolBox.js";
import photographerFactory from "../factories/photographer.js";

async function displayData(photographers) {
    //recuperation de la div
    const photographersSection = document.querySelector(".photographer_section");

    //pour chaque photographe on le crée via la factory + on remplit sa card et on l ajout dans la page
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer, 'accueil');
        const userCardDOM = photographerModel.getNewDOMElement();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();

    //crée et affiche les photographes
    displayData(photographers);
}
init();
