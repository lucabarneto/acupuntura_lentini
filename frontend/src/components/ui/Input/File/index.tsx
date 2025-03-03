import "./File.css";

export const FileInput = () => {
  return (
    <div className="file-field">
      <label htmlFor="profile_picture">
        <img src="/src/assets/placeholder.svg" alt="Imagen placeholder" />
      </label>
      <input type="file" id="profile_picture" />
    </div>
  );
};
