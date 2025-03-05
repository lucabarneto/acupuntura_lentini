import "./File.css";

type Props = {
  form?: string;
  onchangeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const FileInput = ({ form, onchangeEvent }: Props) => {
  return (
    <div className="file-field">
      <label htmlFor="profile_picture">
        <img src="/src/assets/placeholder.svg" alt="Imagen placeholder" />
      </label>
      <input
        form={form}
        type="file"
        id="profile_picture"
        name="profile_picture"
        onChange={onchangeEvent}
      />
    </div>
  );
};
