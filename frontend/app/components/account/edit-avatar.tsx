import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import getCroppedImgSrc from "~/lib/cropImage";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "~/components/ui/drawer";
import Cropper from "react-easy-crop";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import type { User } from "~/features/authentication/authenticationSlice";
import type { AppDispatch } from "~/store";
import api from "~/utils/api";
import { toast } from "sonner";
import { updateUser } from "~/features/authentication/authenticationSlice";

export default function EditAvatarCard({ user, dispatch }: { user: User, dispatch: AppDispatch }) {
  const [avatarURL, setAvatarURL] = useState("");
  const [croppedImgURL, setCroppedImgURL] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [noClick, setNoClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    acceptedFiles, 
    open,
    fileRejections,
  } = useDropzone({onDrop, noClick: noClick, validator: fileTypeValidator});
  const file = acceptedFiles[0];
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    const croppedImgSrc = getCroppedImgSrc(avatarURL, croppedAreaPixels);
    setCroppedImgURL(croppedImgSrc);
  }

  const handleSaveAvatar = async () => {
    if (!croppedImgURL) {
      toast.error('Please crop your image first');
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await api.put('/auth/profile-picture', {
        profilePicture: croppedImgURL
      });
      
      console.log('response: ', response);

      // Update Redux state with backend response
      dispatch(updateUser(response.data.user));
      
      // Reset states
      setAvatarURL("");
      setCroppedImgURL("");
      setNoClick(false);
      
      toast.success('Profile picture updated successfully');
    } catch (error: any) {
      console.error('Error updating profile picture:', error);
      toast.error(error.response?.data?.error || 'Failed to update profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-6 pb-10 gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl tracking-tight">Avatar</h2>
        <div className="flex flex-col font-light text-sm text-muted-foreground gap-2">
          <p className="font-light">This is your avatar.</p>
          <p className="font-light">Click on the avatar to upload a custom one from your files.</p>
        </div>
      </div>
      <Drawer 
        handleOnly={true}
        onOpenChange={(open) => {
          if (open) setNoClick(true)
          else setNoClick(false)
        }}
        open={noClick}
      >
        <DrawerTrigger>
          <Avatar className="w-20 h-20 cursor-pointer">
            <AvatarImage src={user.profilePicture as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
                onClick={handleSaveAvatar}
                disabled={!croppedImgURL || isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}