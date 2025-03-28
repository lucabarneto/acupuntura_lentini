export type InputCardType = {
  image: string;
  alt: string;
  title: string;
  text?: string;

  id: string;
  formId: string;
  name: string;
  value: string;

  changeEvent?(e: React.ChangeEvent<HTMLInputElement>): void;
};
