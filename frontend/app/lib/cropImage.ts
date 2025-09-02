export default function getCroppedImgSrc(imageSrc: string, pixelCrop: any) {
	const image = new Image();
	image.src = imageSrc;
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	console.log("from pixelCrop: ", pixelCrop.width, " ",pixelCrop.height);
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;
	ctx!.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
	const result = canvas.toDataURL("image/jpeg");
	return result;
}

