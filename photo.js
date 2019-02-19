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
}