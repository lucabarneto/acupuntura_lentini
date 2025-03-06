import { Field } from "../../Field";
import { TextInputType } from "../input.types";
import "./Date.css";

type Props = TextInputType;

export const DateInput = (props: Props) => {
  const { id, label, title, form, value, error, changeEvent, blurEvent } =
    props;

  return (
    <Field id={id} label={label} error={error}>
      <input
        className="field-input field-date"
        type="date"
        id={id}
        form={form}
        name={id}
        placeholder="YYYY-MM-DD"
        title={title}
        value={value}
        onChange={changeEvent}
        onBlur={blurEvent}
      />
    </Field>
  );
};
