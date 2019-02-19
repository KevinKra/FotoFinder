class Photo {
	constructor(title, caption, file) {
		this.title = title;
		this.caption = caption;
		this.file = file; //readAsDataURL()
		this.favorite = false;
	}
	saveToStorage(photos) {
		localStorage.setItem("image", JSON.stringify(photos));
	}
	deleteFromStorage() {
		//Should remove from localStorage;
	}
	updatePhoto() {
		//Should update document photo;
	}
	appendCard() {
	cardOutputArea.innerHTML += `
			<article class="card">
			<section>
				<h2 class="card-title">${this.title}</h2>
				<img src="" alt="" class="card-image">
				<p class="card-paragraph">${this.caption}</p>
			</section>
			<footer class="card-footer">
				<button class="btn-trash"><img class="card-trash" src="icons/delete.svg"></button>
				<button class="btn-like"><img class="card-favorite" src="icons/favorite.svg"></button>
			</footer>
		</article>`
		}
}