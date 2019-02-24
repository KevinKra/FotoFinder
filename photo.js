class Photo {
	constructor(title, caption, file, id) {
		this.title = title;
		this.caption = caption;
		this.file = file; //readAsDataURL()
		this.favorite = false;
		this.id = id;
	}
	saveToStorage(photos) {
		localStorage.setItem("photos", JSON.stringify(photos));
	}
	deleteFromStorage() {
		//Should remove from localStorage;
	}
	updatePhoto() {
		//Should update document photo;
	}
	appendCard() {
	cardOutputArea.innerHTML += `
			<article class="card" data-id="${this.id}">
			<section>
				<h2 class="card-title">${this.title}</h2>
				<img src=${this.file} alt="" class="card-image">
				<p class="card-paragraph">${this.caption}</p>
			</section>
			<footer class="card-footer">
				<button class="btn-trash"><img class="card-trash" src="icons/delete.svg"></button>
				<button class="btn-like"><img class="card-favorite" src="icons/favorite.svg"></button>
			</footer>
		</article>`
		}
}