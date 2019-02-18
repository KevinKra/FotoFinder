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
	e.preventDefault();
	checkInputs();
	function checkInputs() {
		if (!titleInput.value || !captionInput.value) alert('Please enter all fields');
	}
}

//will need to implement check for "Choose File" being populated.

//button should check that title, caption, and file, are all populated.
//once all categories are entered, append card to card section.