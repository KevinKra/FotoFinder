//buttons
const chooseFile = document.querySelector("#choose-file");
const viewFavorites = document.querySelector("#view-favorites");
const addToAlbum = document.querySelector("#add-to-album");

//inputs
const form = document.querySelector('.input-form');
const titleInput = document.querySelector(`[name=title-input]`);
const captionInput = document.querySelector(`[name=caption-input]`);

// chooseFile.addEventListener("submit", )
addToAlbum.addEventListener("click", collectUserInputs);


function collectUserInputs(e) {
//flag if ternary true, run function.
	let validFlag = false;
	e.preventDefault();
	checkInputs();

	if (validFlag) {
	const currentTitle = titleInput.value;
	const currentCaption = captionInput.value;
	const newImage = new Photo(currentTitle, currentCaption);
	newImage.saveToStorage();
	}
	function checkInputs() {
		return (!titleInput.value || !captionInput.value)? alert('Please enter all fields') : validFlag = true;
	}
}

//will need to implement check for "Choose File" being populated.

//button should check that title, caption, and file, are all populated.
//once all categories are entered, append card to card section.