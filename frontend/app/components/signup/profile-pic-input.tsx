import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { ImageUp } from "lucide-react";
import Cropper from 'react-easy-crop';
import getCroppedImgSrc from "~/lib/cropImage";

export default function ProfilePictureInput({ avatarURL, setAvatarURL, croppedImgURL, setCroppedImgURL }: any) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [noClick, setNoClick] = useState(false);
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result as string
        setAvatarURL(binaryStr as string);
      }
      reader.readAsDataURL(file)
    })
  }, []);
  function fileTypeValidator(file: File) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return {
        code: "wrong-type",
        message: "Only jpeg, jpg, and png files are accepted."
      };
    }
    return null;
  }
  const {
    getRootProps, 
    getInputProps, 
    isDragActive, 
    acceptedFiles, 
    open,
    fileRejections,
  } = useDropzone({onDrop, noClick: noClick, validator: fileTypeValidator});

  const file = acceptedFiles[0];
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    const croppedImgSrc = getCroppedImgSrc(avatarURL, croppedAreaPixels);
    setCroppedImgURL(croppedImgSrc);
  }

  return (
    avatarURL ?
      <div className="flex flex-col items-center place-content-center">
        <Avatar className="w-30 h-30 outline">
          <AvatarImage src={croppedImgURL ? croppedImgURL : avatarURL} className="aspect-auto" alt="avatar"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Drawer 
          handleOnly={true}
          onOpenChange={(open) => {
            if (open) setNoClick(true)
            else setNoClick(false)
          }}
          open={noClick}
        >
          <DrawerTrigger>
            <Button className="cursor-pointer" variant="link">Edit</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit Profile Picture</DrawerTitle>
              <DrawerDescription>Crop your uploaded image or upload a new one here.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-col w-full flex items-center justify-center gap-3  p-3">
              <div className="relative w-100 h-100 overflow-hidden rounded-lg border">
                <Cropper 
                  image={avatarURL}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                />
              </div>
              {fileRejections.length > 0 ? 
                <p className="text-sm text-muted-foreground py-3">Please use .jpeg or .png files</p> 
                : 
                null
              }
              <div className="flex gap-3">
                <div {...getRootProps()} >
                  <input {...getInputProps()} />
                  <Button variant="secondary" onClick={open}>Use a Different Image</Button>
                </div>
                <Button 
                  onClick={() => setNoClick(false)}
                >
                  Save
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      :
      <>
      <div 
        className={cn("transition duration-150 flex flex-col items-center justify-center rounded-lg text-sm font-light w-full h-50 border text-muted-foreground cursor-pointer gap-3", isDragActive && "border-white")}
        {...getRootProps()}
      >
        <input accept="image/png, image/jpeg" {...getInputProps()} />
        <ImageUp size={32} color={isDragActive ? "white" : undefined} strokeWidth={1.5} className="transition duration-150" />
        {!isDragActive &&
          <>
            {fileRejections.length > 0 ? 
              <p>Please use .jpeg or .png files</p>
              :
              <>
                <p>Click to select an image to upload</p>
                <p>or</p>
                <p>Drag your chosen image here.</p>
              </>
            }
          </>
        }
      </div>
      </> 
  );
}