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
		console.log("Am i being targeted?")
		const target = totalPhotos.indexOf(this);
		totalPhotos.splice(target, 1);
		const stringifyPhotos = JSON.stringify(totalPhotos);
		localStorage.setItem("photos", stringifyPhotos);
	}
	updatePhoto() {
		//Should update document photo;
	}
}