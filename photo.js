class Photo {
	constructor(title, caption, file) {
		this.title = title;
		this.caption = caption;
		// this.file = readAsDataURL(file);
		this.favorite = false;
	}
	saveToStorage() {
		localStorage.setItem("image", JSON.stringify(this));
	}
	deleteFromStorage() {
		//Should remove from localStorage;
	}
	updatePhoto() {
		//Should update document photo;
	}
}