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
const trashCard = document.querySelector(".card-trash");
const favoriteCard = document.querySelector(".card-favorite");

const totalPhotos = JSON.parse(localStorage.getItem('photos')) || [];
let reader = new FileReader();



persistDOM();

addToAlbum.addEventListener("click", loadImage);


function loadImage() {
	console.log('test');
	if (fileInput.files[0]) {
		reader.readAsDataURL(fileInput.files[0]);
		reader.onload = collectUserInputs;
	}
}

function persistDOM() {
	restoreObjectMethods();
	restoredPhotos.forEach( function(photo) {
		photo.appendCard();
	})
}

function restoreObjectMethods() {
	restoredPhotos = [];
	totalPhotos.forEach( function(photo) {
		photo = new Photo(photo.title, photo.caption, photo.file, photo.id);
		restoredPhotos.push(photo);
	})
	return restoredPhotos;
}


function collectUserInputs(e) {
	console.log('test2');
//flag if ternary true, run function.
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
	newPhoto.appendCard();

	function checkInputs() {
		return (!titleInput.value || !captionInput.value || !fileInput.value)? alert('Please enter all fields') : validFlag = true;
	};
}