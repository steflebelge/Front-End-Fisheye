function mediaFactory(mediaData, folderName) {
    debugger
    let divTmp = document.createElement('div');
    divTmp.classList.add('preview');
    divTmp.dataset.date = mediaData.date;
    divTmp.dataset.likes = mediaData.likes;

    let textTmp = document.createElement('p');
    textTmp.innerText = mediaData.title;

    let infosContainer = document.createElement('span');
    infosContainer.classList.add("infosContainer");
    let likesCounter = document.createElement('p');
    likesCounter.innerText = mediaData.likes;
    likesCounter.classList.add("likesCounter");


    let likesImage = document.createElement('img');
    likesImage.classList.add("likesImage");
    likesImage.setAttribute("src", "assets/favicon.png");

    let imgTmp = document.createElement('img');

    if(mediaData.image){
        imgTmp.setAttribute("src", folderName + mediaData.image);
    }else{
        imgTmp.setAttribute("src", folderName + mediaData.video);
    }


    infosContainer.appendChild(textTmp);
    infosContainer.appendChild(likesImage);
    infosContainer.appendChild(likesCounter);
    divTmp.appendChild(imgTmp);
    divTmp.appendChild(infosContainer);
    return divTmp;
}

export default mediaFactory;