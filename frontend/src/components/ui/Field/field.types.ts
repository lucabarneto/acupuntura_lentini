export interface FieldType {
  id: string;
  label: string;
  error: string | undefined;
  children: React.ReactNode;
}
