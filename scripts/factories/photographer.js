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
            //page d'un photographe :
            //gestion du header
            //crée les elements manquants
            const span = document.createElement('span');
            span.appendChild(nameElt);
            span.appendChild(localisation);
            span.appendChild(slogan);
            photographHeader.insertAdjacentElement("afterbegin", span);
            photographHeader.insertAdjacentElement("beforeend", img);

            // gestion du contenu

            //preparation des elements pour la page d'un photographe
            const divSection = document.createElement('div');
            divSection.classList.add('photographer_section');

            //creation des elements manquants

            //tri (label + select + options
            let labelTri = document.createElement('label');
            labelTri.innerText = "Trier par ";
            let selectTri = document.createElement('select');
            selectTri.setAttribute("onchange", "changeTri()");
            labelTri.setAttribute('for', 'selectTri');
            let optionPopularite = document.createElement('option');
            optionPopularite.innerText = "Popularité";
            selectTri.appendChild(optionPopularite);
            let optionDate = document.createElement('option');
            optionDate.innerText = "Date";
            selectTri.appendChild(optionDate);
            let optionTitre = document.createElement('option');
            optionTitre.innerText = "Titre";
            selectTri.appendChild(optionTitre);
            let triContainer = document.createElement('div');
            triContainer.id = "tri";
            triContainer.appendChild(labelTri);
            triContainer.appendChild(selectTri);

            divSection.appendChild(triContainer);
            return (divSection);
        }
    }

    return {name, picture, getNewDOMElement}
}

export default photographerFactory;