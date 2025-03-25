export interface ImageCardType {
  image: string;
  alt: string;
  title: string;
  text?: string;

  clickEvent?(e?: React.MouseEvent): void;
}
