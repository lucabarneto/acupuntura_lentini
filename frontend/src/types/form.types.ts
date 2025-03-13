export type Form<E extends object> = {
  [K in keyof E]: K extends FileKeys
    ? string | File
    : E[K] extends object
    ? Form<E[K]>
    : string;
};

type FileKeys = "profile_picture";

export interface FormErrors {
  [key: string]: string;
}
