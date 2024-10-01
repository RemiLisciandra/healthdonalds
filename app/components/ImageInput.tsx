import { Input } from "@/app/components/ui/input";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";

interface ImageInputProps {
  id: string;
  image: File | null;
  onChange: (file: File) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  id,
  image,
  onChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImage(null);
    }
  }, [image]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      onChange(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input type="file" onChange={onInputChange} accept="image/*" id={id} />
      {previewImage ? (
        <Image
          alt="the preview image"
          src={previewImage}
          className="aspect-square w-12 rounded-md bg-accent"
          width={48}
          height={48}
        />
      ) : null}
    </div>
  );
};
