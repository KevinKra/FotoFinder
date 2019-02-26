//buttons
const chooseFile = document.querySelector("#choose-file");
const viewFavorites = document.querySelector("#view-favorites");
const addToAlbum = document.querySelector("#add-to-album");

//inputs
const form = document.querySelector('.input-form');
const titleInput = document.querySelector(`[name=title-input]`);
const captionInput = document.querySelector(`[name=caption-input]`);
const fileInput = document.querySelector(`[name=file]`);

//sections
const cardOutputArea = document.querySelector(`.main-content`);

//card
const trashBtn = document.querySelector(".card-trash");
const favoriteBtn = document.querySelector(".card-favorite");

let totalPhotos = JSON.parse(localStorage.getItem('photos')) || [];
// console.log(totalPhotos);
const reader = new FileReader();


restoreObjectMethods(totalPhotos);
updateCounter();

cardOutputArea.addEventListener("click", likeCard);
cardOutputArea.addEventListener("click", removeCard);
addToAlbum.addEventListener("click", loadImage);


function removeCard(e) {
	if (e.target.className !== 'card-trash') return;
	const photoRemove = findCard(e);
	e.target.closest(".card").remove();
	photoRemove.deleteFromStorage();
}

//BUG DOM not updating card svg according to status of object
function likeCard(e) {
 if(e.target.className !== "card-favorite") return;
 const photoFavorite = findCard(e);
 photoFavorite.updatePhoto();
 let imgSrc = photoFavorite.favorite ? "icons/favorite-active.svg" : "icons/favorite.svg"
 $(e.target.closest('.btn-like'))
   .html(`<img class="card-favorite" src=${imgSrc}>`)
 updateCounter();
}

function findCard(e) {
	const cardID = Number(e.target.closest(".card").getAttribute("data-id"));
	return totalPhotos.find( (photo) => {
		return photo.id === cardID;
	});
}

function liveUpdateCard(e) {
	const targetCard = findCard(e);
	console.log("target: " + targetCard);
}

//BUG: on reload, if 1 card is clicked, all other card statuses change to false
//could be event delegation/bubbling issue

//its not that it onloads
//preventDefault on all related did nothing
function updateCounter() {
	const parsedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
	let favorites = 0;
	parsedPhotos.forEach( function(photo) {
		if (photo.favorite) {
			favorites++;
		}
	})
	if (favorites !== 0) {
		viewFavorites.innerText = `View ${favorites} Favorites`;
	} else {
		viewFavorites.innerText = `View 0 Favorites`;
	}
	console.log(favorites)
}

// THESE CARDS ARE ONLY BEING APPENDED WITH DEFAULT FALSE FAVORITE PROP
// not reloading DOM with correctly modified stat
function restoreObjectMethods(parsedCards) {
	totalPhotos = [];
	parsedCards.forEach( function(photo) {
		let restoredPhoto = new Photo(photo.title, photo.caption, photo.file, photo.id, photo.favorite, photo.image);
		console.log(restoredPhoto);
		totalPhotos.push(restoredPhoto);
		restoredPhoto.trackActive();
		appendCard(restoredPhoto);
	})
}

function loadImage() {
	if (fileInput.files[0]) {
		reader.readAsDataURL(fileInput.files[0]);
		reader.onload = collectUserInputs;
	}
}

function collectUserInputs(e) {
	let validFlag = false;
	e.preventDefault();
	checkInputs();
	if (!validFlag) return;

	const currentTitle = titleInput.value;
	const currentCaption = captionInput.value;
	const currentFile = e.target.result;
	const newPhoto = new Photo(currentTitle, currentCaption, currentFile, Date.now());

	totalPhotos.push(newPhoto);
	newPhoto.saveToStorage(totalPhotos);

	function checkInputs() {
		return (!titleInput.value || !captionInput.value || !fileInput.value)? alert('Please enter all fields') : validFlag = true;
	};
}

function appendCard(card) {
cardOutputArea.innerHTML += `
		<article class="card" data-id="${card.id}">
		<section>
			<h2 class="card-title">${card.title}</h2>
			<img src=${card.file} alt="" class="card-image">
			<p class="card-paragraph">${card.caption}</p>
		</section>
		<footer class="card-footer">
			<button class="btn-trash"><img class="card-trash" src="icons/delete.svg"></button>
			<button class="btn-like"><img class="card-favorite" src=${card.image}></button>
		</footer>
	</article>`
}
