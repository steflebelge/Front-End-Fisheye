function photographerFactory(data) {
    //recuperation des variables a partir de la data
    const { name, portrait, city, country, price, tagline, id } = data;

    //recuperation de la photo de profile
    const picture = `assets/photographers/profiles/${portrait}`;

    //generation de la carte d'un photographe
    function getUserCardDOM() {
        //preparation des elements
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const localisation = document.createElement( 'h3' );
        const slogan = document.createElement( 'h4' );
        const prix = document.createElement( 'h5' );
        const h2 = document.createElement( 'h2' );
        const linkContainer = document.createElement('a');

        //set de leurs attributs
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de profil du photographe ${name}.`);
        img.setAttribute("title", `Photo de profil du photographe ${name}.`);
        h2.textContent = name;
        localisation.textContent = `${city}, ${country}`;
        slogan.textContent = tagline;
        prix.textContent = `${price}€/jour`;
        linkContainer.setAttribute('href', `photographer.html?id=${id}`)

        //ajout des elements dans l'article
        linkContainer.appendChild(img);
        linkContainer.appendChild(h2);
        article.appendChild(linkContainer);
        article.appendChild(localisation);
        article.appendChild(slogan);
        article.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}