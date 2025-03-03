import "./DetailsPane.css";

type Props = {
  pane: React.ReactNode;
};
export const DetailsPane = ({ pane }: Props) => {
  return (
    <section id="details-pane" className="details-pane">
      {pane}
    </section>
  );
};
