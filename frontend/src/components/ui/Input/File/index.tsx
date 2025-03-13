import { useFiles } from "../../../../hooks/useFiles";
import "./File.css";

type Props = {
  form?: string;
  changeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const FileInput = ({ form, changeEvent }: Props) => {
  const { thumbnail, handleFiles } = useFiles();

  return (
    <div className="file-field">
      <label htmlFor="profile_picture">
        <div className="image-container">
          <img
            className="profile-picture"
            src="/src/assets/placeholder.svg"
            alt="Imagen placeholder"
            ref={thumbnail}
          />
        </div>
        <div className="file-label">Seleccionar imagen</div>
      </label>
      <input
        form={form}
        type="file"
        id="profile_picture"
        name="profile_picture"
        onChange={(e) => {
          changeEvent(e);
          if (e.target.files) handleFiles(e.target.files);
        }}
      />
    </div>
  );
};
