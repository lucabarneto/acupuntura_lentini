import { useFiles } from "../../../../hooks/useFiles";
import "./File.css";

type Props = {
  id: string;
  form?: string;
  changeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const FileInput = ({ id, form, changeEvent }: Props) => {
  const { thumbnail, handleFiles } = useFiles();

  return (
    <div className="file-field">
      <label htmlFor={id}>
        <div className="image-container">
          <img
            className="profile-picture"
            src="/img/placeholder.svg"
            alt="Imagen placeholder"
            ref={thumbnail}
          />
        </div>
        <div className="file-label">Seleccionar imagen</div>
      </label>
      <input
        form={form}
        type="file"
        id={id}
        name={id}
        onChange={(e) => {
          changeEvent(e);
          if (e.target.files) handleFiles(e.target.files);
        }}
      />
    </div>
  );
};
