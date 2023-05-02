//Media factory, crée les elements neccessaire a l'affichage des medias salon leur type (img/video)
function mediaFactory(mediaData, folderName) {
    let divTmp = document.createElement('div');
    divTmp.classList.add('preview');
    divTmp.dataset.date = mediaData.date;
    divTmp.dataset.likes = mediaData.likes;
    divTmp.dataset.titre = mediaData.title;
    divTmp.dataset.idMedia = mediaData.id;


    let textTmp = document.createElement('p');
    textTmp.innerText = mediaData.title;

    let infosContainer = document.createElement('span');
    infosContainer.classList.add("infosContainer");
    let likesCounter = document.createElement('p');
    likesCounter.innerText = mediaData.likes;
    likesCounter.classList.add("likesCounter");

    let likesImage = document.createElement('img');
    likesImage.classList.add("likesImage");
    likesImage.classList.add("filterToRed");
    likesImage.setAttribute("src", "assets/icons/like.svg");

    let imgTmp = document.createElement('img');

    if(mediaData.image){
        imgTmp.setAttribute("src", folderName + mediaData.image);
        imgTmp.setAttribute("alt", mediaData.title);
    }else{
        //balise video + autoplay false
        imgTmp = document.createElement('video');
        imgTmp.src=folderName + mediaData.video;
        imgTmp.innerText = "Votre navigateur ne permet pas de lire les vidéos.";
    }

    infosContainer.appendChild(textTmp);
    infosContainer.appendChild(likesImage);
    infosContainer.appendChild(likesCounter);
    divTmp.appendChild(imgTmp);
    divTmp.appendChild(infosContainer);
    return divTmp;
}

export default mediaFactory;