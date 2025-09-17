/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useRef, useState, useEffect } from "react";
import { Slider } from "../ui/slider";

interface ImageCropperProps {
  imgSrc: string,
  setImgSrc?: () => void,
  circleRadius?: number,
  canvasSize?: number,
}

export default function ImageCropper({ 
  imgSrc, 
  setImgSrc,
  circleRadius = 200,
  canvasSize = 500 
}: ImageCropperProps) {
  const imgCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const [scale, setScale] = useState(0.3);
  const minScale = 0.5, maxScale = 3;
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const circleX = canvasSize / 2;
  const circleY = canvasSize / 2;

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;

    const canvas = imgCanvasRef.current;
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    const cx = canvasSize / 2 + offset.x;
    const cy = canvasSize / 2 + offset.y;
    ctx.drawImage(
      img,
      cx - (img.width / 2) * scale,
      cy - (img.height / 2) * scale,
      img.width * scale,
      img.height * scale
    );
  }, [scale, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({
      x: e.nativeEvent.offsetX - offset.x,
      y: e.nativeEvent.offsetY - offset.y
    });
  }

  const handleMouseUp = () => {
    setDragging(false);
  }

  const handleMouseLeave = () => {
    setDragging(false);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setOffset({
        x: e.nativeEvent.offsetX - dragStart.x,
        y: e.nativeEvent.offsetY - dragStart.y
      });
    }
  }

  return (
    <>
      <div className="relative">
        <canvas
          ref={imgCanvasRef}
          width={canvasSize}
          height={canvasSize}
        />
        <div 
          className="absolute inset-0 bg-black/60
                    [mask-image:radial-gradient(circle_at_center,transparent_200px,black_101px)]
                    mask-no-repeat mask-center mask-cover cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
        >
        </div>
      </div>
      <Slider orientation="vertical"/>
    </>
  );
}