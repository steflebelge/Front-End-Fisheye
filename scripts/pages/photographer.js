import {getPhotographers, displayModal, closeModal} from "../utils/toolBox.js";
import photographerFactory from "../factories/photographer.js";

async function displayData(specifiquePhotographer, specifiquePhotographerMedias) {
    //recuperation de la div
    const mainContent = document.querySelector("main#main");

    //on crée le photographe via la factory +
    // on remplit sa card et on l ajout dans la page ?
    const photographerModel = photographerFactory(specifiquePhotographer);
    const photographerSection = photographerModel.getNewDOMElement(mainContent.firstElementChild, specifiquePhotographerMedias);
    mainContent.appendChild(photographerSection);

    //
}

async function init() {
    //recupération de l'id
    let params = (new URL(document.location)).searchParams;
    let idPhotographe = params.get('id');

    // Récupère les datas des photographes
    const {photographers, media} = await getPhotographers();

    let specifiquePhotographer = photographers.find(photoGTmp => photoGTmp.id === parseInt(idPhotographe));
    let specifiquePhotographerMedias = media.filter(mediaTmp => mediaTmp.photographerId === parseInt(idPhotographe));

    //crée et affiche les photographes
    // completeHeaderSection(specifiquePhotographer);
    displayData(specifiquePhotographer, specifiquePhotographerMedias);
}

init();