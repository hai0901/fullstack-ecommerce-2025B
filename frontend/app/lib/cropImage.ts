/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

export default function getCroppedImgSrc(
	imageSrc: string,
	pixelCrop: { x: number; y: number; width: number; height: number },
	options?: { maxWidth?: number; maxHeight?: number; quality?: number }
) {
	const image = new Image();
	image.src = imageSrc;

	// Crop to an intermediate canvas first
	const cropCanvas = document.createElement("canvas");
	const cropCtx = cropCanvas.getContext("2d");
	cropCanvas.width = pixelCrop.width;
	cropCanvas.height = pixelCrop.height;
	cropCtx!.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// Downscale if larger than target max dimensions
	const maxWidth = options?.maxWidth ?? 512;
	const maxHeight = options?.maxHeight ?? 512;
	const quality = options?.quality ?? 0.7;

	let targetW = cropCanvas.width;
	let targetH = cropCanvas.height;
	const scale = Math.min(maxWidth / targetW, maxHeight / targetH, 1);
	targetW = Math.floor(targetW * scale);
	targetH = Math.floor(targetH * scale);

	const outCanvas = document.createElement("canvas");
	const outCtx = outCanvas.getContext("2d");
	outCanvas.width = targetW;
	outCanvas.height = targetH;
	outCtx!.imageSmoothingEnabled = true;
	outCtx!.imageSmoothingQuality = "high" as ImageSmoothingQuality;
	outCtx!.drawImage(cropCanvas, 0, 0, targetW, targetH);

	return outCanvas.toDataURL("image/jpeg", quality);
}

