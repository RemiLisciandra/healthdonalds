import { Input } from "@/components/ui/input";
import { useState, ChangeEvent } from "react";
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
  const [previewImage, setPreviewImage] = useState<string | null>(
    image ? URL.createObjectURL(image) : null,
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
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
