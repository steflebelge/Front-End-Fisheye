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
function displaylightBox(elt) {
    const lightBox = document.getElementById("lightBox");
    lightBox.querySelector('div#media').innerHTML = elt.outerHTML;
    lightBox.style.display = "block";
}
function closelightBox() {
    const lightBox = document.getElementById("lightBox");
    lightBox.style.display = "none";
}

function nextMedia(){
    debugger
}
function prevMedia(){
    debugger
}

function changeTri() {
    let photographer_section = document.querySelector('div.photographer_section');
    let tri = photographer_section.querySelector('div#tri');
    let triValue = tri.querySelector('select').selectedOptions[0].innerText;
    let previews = photographer_section.querySelectorAll('div.preview');
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
    previewsSorted.forEach(elt => photographer_section.appendChild(elt));

}

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
    if(document.querySelector('select').selectedOptions[0].innerText === "Popularité")
        changeTri();
}

function checkFormValid(form) {
    let isValid = true;

    //parcours des input + verification de leur validité
    form.querySelectorAll('input').forEach(function (inputTmp) {
        if (!inputTmp.checkValidity())
            isValid = false;
    });

    return isValid;
}

function submitForm(){

    //verification des entres du formulaire
    if(checkFormValid(document.querySelector('form'))) {

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
        console.log(dataToSend);
        document.querySelector('form').reset();
    }
}


export {getPhotographers, displayModal, closeModal, changeTri, gestionLikes, submitForm, displaylightBox, closelightBox, nextMedia, prevMedia};