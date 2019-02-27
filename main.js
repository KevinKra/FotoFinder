//buttons
const chooseFile = document.querySelector("#choose-file");
const viewFavorites = document.querySelector("#view-favorites");
const addToAlbum = document.querySelector("#add-to-album");

//inputs
const form = document.querySelector('.input-form');
const titleInput = document.querySelector(`[name=title-input]`);
const captionInput = document.querySelector(`[name=caption-input]`);
const fileInput = document.querySelector(`[name=file]`);
const inputs = document.querySelectorAll(`.input`);
const searchBar = document.querySelector(`#search-bar`); 
console.log(inputs);
//sections
const cardOutputArea = document.querySelector(`.main-content`);

//card
const trashBtn = document.querySelector(".card-trash");
const favoriteBtn = document.querySelector(".card-favorite");

let totalPhotos = JSON.parse(localStorage.getItem('photos')) || [];
console.log(totalPhotos)
// console.log(totalPhotos);
const reader = new FileReader();


restoreObjectMethods(totalPhotos);
updateCounter();

form.addEventListener("input", checkEach)
viewFavorites.addEventListener('click', searchForFavorites);
addToAlbum.addEventListener("click", loadImage);
searchBar.addEventListener("keyup", searchCards)
cardOutputArea.addEventListener("click", likeCard);
cardOutputArea.addEventListener("click", removeCard);
cardOutputArea.addEventListener("focusout", editExistingCard)


function searchForFavorites(e) {
	e.preventDefault();
	clearCards();
	let favoritePhotos = []; 
	favoritePhotos = totalPhotos.forEach( photo => {
		 return photo.favorite? appendCard(photo) : null;
	})
}


function checkEach() {
	let allValid = 0;
	inputs.forEach( input => {
		if(input.value.length > 0 || fileInput.files[0] ) {
			allValid++;
		}
	});
	if (allValid >= 3) {
		activateButton(addToAlbum);
	}
}


function searchCards(e){
  const searchBarText = e.target.value;
  const regex = new RegExp(searchBarText, "i");
  clearCards();
  for (let i = 0; i < totalPhotos.length; i++) {
    if(regex.test(totalPhotos[i].title) || regex.test(totalPhotos[i].body)) {
      appendCard(totalPhotos[i]);
    }
  }
};

function clearCards() {
	const cardsToRemove = cardOutputArea.querySelectorAll('.card');
	cardsToRemove.forEach( function(card) {
		card.remove();
	}) 
}

function activateButton(button) {
	button.removeAttribute("disabled");
}

function editExistingCard(e) {
	let targetIdea = findCard(e);
	console.log(targetIdea);
	const newValue = e.target.innerHTML;
	console.log(newValue);
	if (e.target.className  === "card-title") {
		targetIdea.title = newValue;
	}
	if (e.target.className  === "card-paragraph") {
		targetIdea.caption = newValue;
	}
	targetIdea.saveToStorage(totalPhotos);	
}

function removeCard(e) {
	if (e.target.className !== 'card-trash') return;
	const photoRemove = findCard(e);
	e.target.closest(".card").remove();
	photoRemove.deleteFromStorage();
}

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
}

function restoreObjectMethods(parsedCards) {
	totalPhotos = [];
	parsedCards.forEach( function(photo) {
		let restoredPhoto = new Photo(photo.title, photo.caption, photo.file, photo.id, photo.favorite, photo.image);
		// console.log(restoredPhoto);
		totalPhotos.push(restoredPhoto);
		restoredPhoto.trackActive();
		appendCard(restoredPhoto);
	})
}

function loadImage(e) {
	if (fileInput.files[0]) {
		reader.readAsDataURL(fileInput.files[0]);
		reader.onload = collectUserInputs;
	} else {
		e.preventDefault();
		alert("Please enter all inputs.")
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
		return (!titleInput.value || !captionInput.value || !fileInput.value)? null : validFlag = true;
	};
}

function appendCard(card) {
cardOutputArea.innerHTML += `
		<article class="card" data-id="${card.id}">
		<section>
			<h2 class="card-title" contenteditable="true">${card.title}</h2>
			<img src=${card.file} alt="" class="card-image">
			<p class="card-paragraph" contenteditable="true">${card.caption}</p>
		</section>
		<footer class="card-footer">
			<button onClick="window.location.reload()" class="btn-trash"><img class="card-trash" src="icons/delete.svg"></button>
			<button class="btn-like"><img class="card-favorite" src=${card.image}></button>
		</footer>
	</article>`
}
