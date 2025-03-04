import "./File.css";

type Props = {
  value: string;
  onchangeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const FileInput = ({ value, onchangeEvent }: Props) => {
  return (
    <div className="file-field">
      <label htmlFor="profile_picture">
        <img src="/src/assets/placeholder.svg" alt="Imagen placeholder" />
      </label>
      <input
        type="file"
        id="profile_picture"
        name="profile_picture"
        value={value}
        onChange={onchangeEvent}
      />
    </div>
  );
};
