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
const card = document.querySelector('.card');

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
	const newPhoto = new Photo(currentTitle, currentCaption, currentFile);

	totalPhotos.push(newPhoto);
	newPhoto.saveToStorage(totalPhotos);
	appendCard();
	function checkInputs() {
		return (!titleInput.value || !captionInput.value || !fileInput.value)? alert('Please enter all fields') : validFlag = true;
	}
}

function appendCard() {
	cardOutputArea.innerHTML += `
			<article class="card">
			<section>
				<h2 class="card-title">Waterfall Image</h2>
				<img src="" alt="" class="card-image">
				<p class="card-paragraph">Lorem Ipsum  dolor sit amet, consectetuer something elit</p>
			</section>
			<footer class="card-footer">
				<button class="btn-trash"><img class="card-trash" src="icons/delete.svg"></button>
				<button class="btn-like"><img class="card-favorite" src="icons/favorite.svg"></button>
			</footer>
		</article>`
}
//button should check that title, caption, and file, are all populated.
//once all categories are entered, append card to card section.