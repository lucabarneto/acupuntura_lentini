import "./DetailsPane.css";

type Props = {
  children: React.ReactNode;
};
export const DetailsPane = ({ children }: Props) => {
  return (
    <section id="details-pane" className="details-pane">
      {children}
    </section>
  );
};
