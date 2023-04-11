import {getPhotographers, changeTri, displayModal, closeModal, gestionLikes} from "../utils/toolBox.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";

async function displayData(specifiquePhotographer, specifiquePhotographerMedias) {
    //recuperation de la div
    const mainContent = document.querySelector("main#main");

    //on crée le photographe via la factory +
    // on remplit sa card et on l ajout dans la page ?
    const photographerModel = photographerFactory(specifiquePhotographer);
    const photographerSection = photographerModel.getNewDOMElement(mainContent.firstElementChild, specifiquePhotographerMedias);

    let totalLikes = 0;
    let photosFolder = specifiquePhotographer.name.slice(0, specifiquePhotographer.name.indexOf(' ')).replace('-', " ");

    //ajout des contenus multimédias
    specifiquePhotographerMedias.forEach(function (mediaTmp) {
        let divMediaTmp = mediaFactory(mediaTmp, "assets/photographers/" + photosFolder + "/");
        photographerSection.appendChild(divMediaTmp);
        totalLikes += mediaTmp.likes;
    });


    //set des events listeners
    photographerSection.querySelector("select").addEventListener("change", changeTri.bind(this));
    photographerSection.querySelectorAll("img.likesImage").forEach(function (imgTmp) {
        imgTmp.addEventListener("click", gestionLikes.bind(this, imgTmp));
    });


    //ajout du bandeau likes et tarifs
    let bandeau = document.createElement('div');
    bandeau.id = "bandeau";
    let nbLike = document.createElement('p');
    nbLike.innerText = totalLikes;
    let imgLike = document.createElement('img');
    imgLike.setAttribute("src", "assets/favicon.png");
    let tarif = document.createElement('p')
    tarif.innerText = `${specifiquePhotographer.price}€ / jour`;

    nbLike.appendChild(imgLike);
    bandeau.appendChild(nbLike);
    bandeau.appendChild(tarif);

    document.body.appendChild(bandeau);


    //ajout du contenu a la page
    mainContent.appendChild(photographerSection);
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
