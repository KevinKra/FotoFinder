//buttons
const chooseFile = document.querySelector("#choose-file");
const viewFavorites = document.querySelector("#view-favorites");
const addToAlbum = document.querySelector("#add-to-album");

//inputs
const form = document.querySelector('.input-form');
const titleInput = document.querySelector(`[name=title-input]`);
const captionInput = document.querySelector(`[name=caption-input]`);
const fileInput = document.querySelector(`[name=file]`);

const totalPhotos = [];

addToAlbum.addEventListener("click", collectUserInputs);

function collectUserInputs(e) {
//flag if ternary true, run function.
	let validFlag = false;
	e.preventDefault();
	checkInputs();
	if (!validFlag) return;

	const currentTitle = titleInput.value;
	const currentCaption = captionInput.value;
	const currentFile = fileInput.value;
	console.log(fileInput.value);
	const newPhoto = new Photo(currentTitle, currentCaption, currentFile);
	totalPhotos.push(newPhoto);
	newPhoto.saveToStorage(totalPhotos);
	function checkInputs() {
		return (!titleInput.value || !captionInput.value || !fileInput.value)? alert('Please enter all fields') : validFlag = true;
	}
}
//button should check that title, caption, and file, are all populated.
//once all categories are entered, append card to card section.