//Media factory, crée les elements neccessaire a l'affichage des medias salon leur type (img/video)
function mediaFactory(mediaData, folderName) {
    let articleTmp = document.createElement('article');
    articleTmp.classList.add('preview');
    articleTmp.dataset.date = mediaData.date;
    articleTmp.dataset.likes = mediaData.likes;
    articleTmp.dataset.titre = mediaData.title;
    articleTmp.dataset.idMedia = mediaData.id;


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
        imgTmp.innerText = mediaData.title;
    }

    infosContainer.appendChild(textTmp);
    infosContainer.appendChild(likesImage);
    infosContainer.appendChild(likesCounter);
    articleTmp.appendChild(imgTmp);
    articleTmp.appendChild(infosContainer);
    return articleTmp;
}

export default mediaFactory;