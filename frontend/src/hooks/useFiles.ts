import { useRef } from "react";

export const useFiles = () => {
  const thumbnail = useRef<null | HTMLImageElement>(null);

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        thumbnail.current!.src = e.target!.result as string;
        thumbnail.current!.alt = "Imagen de la persona paciente";
      };
      reader.readAsDataURL(file);
    }
  };

  return { thumbnail, handleFiles };
};
