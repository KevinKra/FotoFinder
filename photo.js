class Photo {
	constructor(title, caption, file) {
		this.title = title;
		this.caption = caption;
		this.file = readAsDataURL(file);
		this.favorite = false;
	}
	saveToStorage() {
		//Should save to storage for data persistence between reloads;
	}
	deleteFromStorage() {
		//Should remove from localStorage;
	}
	updatePhoto() {
		//Should update document photo;
	}
}