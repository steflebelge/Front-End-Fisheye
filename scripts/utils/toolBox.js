//Fonctions utiles a différents endroits du site

//recuperation des infos sur les photographes via le JSON
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

//gestion de la navigation au clavier
function navigationClavier() {
    //on recupere l'event
    let e = arguments[1];
    //et la jeyCode associée
    let key = e.keyCode;

    //on recupere les deux modale et leur etat de display
    let contactModale = document.getElementById('contact_modal');
    let lightBox = document.getElementById('lightBox');

    let contactModaleDisplay = window.getComputedStyle(contactModale, null).display;
    let lightBoxDisplay = window.getComputedStyle(lightBox, null).display;

    if (contactModaleDisplay !== "none") {
        //cas ou la modale de contact est ouverte
        switch (key) {
            //cas "echap"
            case 27:
                closeModal();
                break;
            //cas "entrée"
            case 13:
                submitForm();
                break;
        }
    } else if (lightBoxDisplay !== "none") {
        //cas ou la lightbox est ouverte
        switch (key) {
            //cas "echap"
            case 27:
                closelightBox();
                break;
            //cas "fleche droite"
            case 39:
                nextMedia();
                break;
            //cas "fleche gauche"
            case 37:
                prevMedia();
                break;
        }
    }else{
        //aucune modale d'ouverte, on gere la navigation/interraction

        //si on es focus sur une image de preview + "entrée" => on click dessus
        if(document.activeElement.classList.contains('preview')
            && key === 13) {
            document.activeElement.firstElementChild.click();
            return;
        }

        //si on es focus sur une image de like + "entrée" => on click dessus
        if((document.activeElement.nodeName === "IMG"
            && document.activeElement.classList.contains('likesImage'))
            && key === 13) {
            document.activeElement.click();
            return;
        }

    }
}

//Gestion de l'affichage/désaffichage de la modale de contact
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.querySelector('input').focus();
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
}

//Gestion de l'affichage/désaffichage de la lightBox
function displaylightBox(elt) {
    const lightBox = document.getElementById("lightBox");
    lightBox.querySelector('div#media').innerHTML = "";
    lightBox.setAttribute("aria-hidden", "false");
    let imgTmp = document.createElement('img');
    imgTmp.src = elt.src;
    if (elt.nodeName === "VIDEO") {
        imgTmp = document.createElement('video');
        imgTmp.innerHTML = '<source src="' + elt.src + '" type="video/mp4">' + elt.innerHTML;
        imgTmp.setAttribute('controls', '');
        imgTmp.setAttribute('autoplay', '');
    }
    imgTmp.id = elt.parentElement.dataset.idMedia;
    let textTmp = document.createElement('p');
    textTmp.innerText = elt.parentElement.dataset.titre;
    lightBox.querySelector('div#media').appendChild(imgTmp);
    lightBox.querySelector('div#media').appendChild(textTmp);
    lightBox.style.display = "block";

    //si video focus dessus pour pause via espace
    if (elt.nodeName === "VIDEO")
        document.getElementById("lightBox").querySelector('video').focus();
}
function closelightBox() {
    const lightBox = document.getElementById("lightBox");
    lightBox.setAttribute("aria-hidden", "true");
    lightBox.style.display = "none";
}

//Gestion de la navigation au clavier entre les medias d'un photographe
function nextMedia() {
    //recuperation id dans data-set
    let idImgActuelle = document.getElementById('media').firstElementChild.id;

    //recuperation avec id + class preview et verif si next/prev existe + recup elt
    let articleImgActuelle = document.querySelector('article.preview[data-id-media="' + idImgActuelle + '"]');
    if (articleImgActuelle.nextElementSibling
        && articleImgActuelle.nextElementSibling.firstElementChild)
        articleImgActuelle.nextElementSibling.firstElementChild.click();
    else
        document.querySelector('article.preview').firstElementChild.click();

}
function prevMedia() {
    //recuperation id dans data-set
    let idImgActuelle = document.getElementById('media').firstElementChild.id;

    //recuperation avec id + class preview et verif si next/prev existe + recup elt
    let articleImgActuelle = document.querySelector('article.preview[data-id-media="' + idImgActuelle + '"]');
    if (articleImgActuelle.previousSibling
        && articleImgActuelle.previousSibling.id !== "tri"
        && articleImgActuelle.previousSibling.firstElementChild)
        articleImgActuelle.previousSibling.firstElementChild.click();
    else
        document.querySelectorAll('article.preview')[document.querySelectorAll('article.preview').length - 1].firstElementChild.click();
}

//Gestion du tri des medias d'un photographe
function changeTri() {
    let photographer_section = document.querySelector('div.photographer_section');
    let tri = photographer_section.querySelector('div#tri');
    let triValue = tri.querySelector('select').selectedOptions[0].innerText;
    tri.querySelector('select').selectedOptions[0].setAttribute("aria-current", "page");
    let previews = photographer_section.querySelectorAll('article.preview');
    let previewsSorted = [];

    switch (triValue) {
        case "Popularité":
            previewsSorted = Array.from(previews).sort((a, b) => {
                return parseInt(b.dataset.likes) - parseInt(a.dataset.likes);
            });
            break;
        case "Date":
            previewsSorted = Array.from(previews).sort((a, b) => {
                return new Date(b.dataset.date) > new Date(a.dataset.date);
            });
            break;
        case "Titre":
            previewsSorted = Array.from(previews).sort((a, b) => {
                return a.dataset.titre.localeCompare(b.dataset.titre);
            });
            break;
    }

    photographer_section.innerHTML = "";
    photographer_section.appendChild(tri);
    let tabIndex = 3;

    previewsSorted.forEach(function (elt) {
        tabIndex++
        elt.tabIndex = tabIndex;
        tabIndex++
        elt.querySelector('img.likesImage').tabIndex = tabIndex;
        photographer_section.appendChild(elt);
    });
}

//Gestion du nombre de llike d'un media sur clic d'une icone coeur, met aussi a jour l'encart avec le total de likes
function gestionLikes(element) {
    element.classList.toggle('liked');
    let count = parseInt(element.nextElementSibling.innerText);
    let totalCount = parseInt(document.getElementById('bandeau').firstElementChild.innerText);

    //calcul des nouveaux totaux
    if (element.classList.contains('liked')) {
        count++;
        totalCount++;
    } else {
        count--;
        totalCount--;
    }

    //mise a jour de la photo
    element.nextElementSibling.innerText = count;
    element.parentElement.parentElement.dataset.likes = count.toString();

    //MAJ bandeau
    document.getElementById('bandeau').firstElementChild.innerHTML = document.getElementById('bandeau').firstElementChild.innerHTML.replace(document.getElementById('bandeau').firstElementChild.innerText, totalCount);

    //ajout json ?

    //gestion du tri
    if (document.querySelector('select').selectedOptions[0].innerText === "Popularité")
        changeTri();
}

//Verification de la validité du formulaire de contact
function checkFormValid(form) {
    let res = true;
    //parcours des input + verification de leur validité
    form.querySelectorAll('input').forEach(function (inputTmp) {
        if (inputTmp.checkValidity() === false) {
            res = false;
            inputTmp.setAttribute("aria-invalid", "true");
        }else
            inputTmp.removeAttribute("aria-invalid");
    });

    if(document.getElementById('msg').value.trim() === ""){
        document.getElementById('msg').value = "";
        res = false;
    }

    return res;
}

//Fonction de soumission du formulaire de contact
function submitForm() {
    //verification des entres du formulaire
    if (checkFormValid(document.querySelector('form'))) {

        //recuperation du FormData correspondant au form
        let formData = new FormData(document.querySelector('form'));

        //preparation de l'objet Json a envoyer via xhr/fetch
        let jsonData = {};

        //iteration sur les entrees du formulaire pour completer la data a envoyer
        for (const [key, value] of formData.entries()) {
            jsonData[key] = value;
        }

        //transforme le json en string pour envoi via xhr/fetch
        let dataToSend = JSON.stringify(jsonData);
        console.log("Informations du formulaire : " + dataToSend);
        document.querySelector('form').reset();
        document.getElementById('msg').value = "";
    }
}

//Exports des fonctions
export {
    getPhotographers,
    displayModal,
    closeModal,
    changeTri,
    gestionLikes,
    submitForm,
    displaylightBox,
    closelightBox,
    nextMedia,
    navigationClavier,
    prevMedia
};