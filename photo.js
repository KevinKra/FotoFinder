class Photo {
	constructor(title, caption, file, id, favorite, image) {
		this.title = title;
		this.caption = caption;
		this.file = file;
		this.favorite = favorite || false;
		this.id = id;
		this.image = image || "icons/favorite.svg";
	}
	saveToStorage(photos) {
		localStorage.setItem("photos", JSON.stringify(photos));
	}
	deleteFromStorage() {
		const target = totalPhotos.indexOf(this);
		totalPhotos.splice(target, 1);
		const stringifyPhotos = JSON.stringify(totalPhotos);
		localStorage.setItem("photos", stringifyPhotos);
	}
	updatePhoto() {
		const index = totalPhotos.indexOf(this);
		const target = totalPhotos[index]
		console.log("before: " + target.favorite);
		target.favorite = !target.favorite;
		console.log("after: " + target.favorite);
		console.log("totalPHotos: " + totalPhotos[0].favorite);
		const stringifyPhotos = JSON.stringify(totalPhotos);
		localStorage.setItem("photos", stringifyPhotos)
	}
	trackActive() {
		console.log("trackActive: " + this.favorite)
		if (this.favorite) {
			this.image = "icons/favorite-active.svg";
		} else if (!this.favorite) {
			this.image = "icons/favorite.svg";
		}
	}
}