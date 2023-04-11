function photographerFactory(data, pageConcernee) {
    //recuperation des variables a partir de la data
    const {name, portrait, city, country, price, tagline, id} = data;

    //recuperation de la photo de profile
    const picture = `assets/photographers/profiles/${portrait}`;

    //generation d'un element dom neccessaire selon la page
    function getNewDOMElement(photographHeader, specifiquePhotographerMedias) {
        //preparation des elements generiques
        const article = document.createElement('article');
        const img = document.createElement('img');
        const localisation = document.createElement('h3');
        const slogan = document.createElement('h4');
        const prix = document.createElement('h5');
        const nameElt = document.createElement('h2');

        //set de leurs attributs
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de profil du photographe ${name}.`);
        img.setAttribute("title", `Photo de profil du photographe ${name}.`);
        nameElt.textContent = name;
        localisation.textContent = `${city}, ${country}`;
        slogan.textContent = tagline;
        prix.textContent = `${price}€/jour`;

        if (pageConcernee === "accueil") {
            //preparation des elements pour la page d accueil
            const linkContainer = document.createElement('a');

            //set de leurs attributs
            linkContainer.setAttribute('href', `photographer.html?id=${id}`)

            //ajout des elements dans l'article
            linkContainer.appendChild(img);
            linkContainer.appendChild(nameElt);
            article.appendChild(linkContainer);
            article.appendChild(localisation);
            article.appendChild(slogan);
            article.appendChild(prix);
            return (article);
        } else {
            //crée les elements manquants
            const span = document.createElement('span');

            //modifie header
            span.appendChild(nameElt);
            span.appendChild(localisation);
            span.appendChild(slogan);
            photographHeader.insertAdjacentElement("afterbegin", span);

            photographHeader.insertAdjacentElement("beforeend", img);

            // crée et retourne la section
            //?ajout encart dans header avec position absolute ?

            //preparation des elements pour la page d'un photographe
            const divSection = document.createElement('div');
            divSection.classList.add('photograph-section');

            //ajout des elements aux bon endroits

            return (divSection);
        }
    }

    return {name, picture, getNewDOMElement}
}

export default photographerFactory;