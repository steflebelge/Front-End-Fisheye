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

function changeTri() {
    let allMedias = document.querySelectorAll("div.preview");
    let triValue = document.querySelector('select').selectedOptions[0].innerText;
    debugger

    switch (triValue) {
        case "Popularité":
            break;
        case "Date":
            break;
        case "Titre":
            break;
    }
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
debugger
    //MAJ bandeau
    document.getElementById('bandeau').firstElementChild.innerHTML = document.getElementById('bandeau').firstElementChild.innerHTML.replace(document.getElementById('bandeau').firstElementChild.innerText, totalCount);

    //ajout json ?
}


export {getPhotographers, displayModal, closeModal, changeTri, gestionLikes};