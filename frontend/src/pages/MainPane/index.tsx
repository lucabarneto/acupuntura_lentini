import "./MainPane.css";

type Props = {
  children: React.ReactNode;
};

export const MainPane = ({ children }: Props) => {
  return (
    <div id="main-pane" className="main-pane">
      {children}
    </div>
  );
};
