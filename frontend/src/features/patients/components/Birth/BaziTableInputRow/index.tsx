import { UseForm } from "../../../../../hooks/useForm";
import { BaziTableForm } from "../../../types/IPatient";

type Props = {
  heading: "heavenly_stems" | "earthly_branches" | "hidden_stems";
  formData: UseForm<BaziTableForm>;
  datalistId: string;
};

export const BaziTableInputRow = (props: Props) => {
  const { heading, formData, datalistId } = props;
  const { form, formMethods } = formData;

  const firstRow = form.fields.hidden_stems.first_row;
  const secondRow = form.fields.hidden_stems.second_row;
  const thirdRow = form.fields.hidden_stems.third_row;

  return (
    <>
      {heading === "hidden_stems" ? (
        <>
          <tr>
            <th rowSpan={3}>Troncos ocultos</th>
            {Object.entries(firstRow).map((field, index) => {
              return (
                <td key={index}>
                  <input
                    type="text"
                    form="add-patient-bazi-table-form"
                    list={datalistId}
                    name={field[0]}
                    placeholder="Escribe aquí"
                    data-group={heading}
                    data-subgroup="first_row"
                    value={field[1]}
                    onChange={(e) => formMethods.handleChange(e, 2)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            {Object.entries(secondRow).map((field, index) => {
              return (
                <td key={index}>
                  <input
                    type="text"
                    form="add-patient-bazi-table-form"
                    list={datalistId}
                    name={field[0]}
                    placeholder="Escribe aquí"
                    data-group={heading}
                    data-subgroup="second_row"
                    value={field[1]}
                    onChange={(e) => formMethods.handleChange(e, 2)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            {Object.entries(thirdRow).map((field, index) => {
              return (
                <td key={index}>
                  <input
                    type="text"
                    form="add-patient-bazi-table-form"
                    list={datalistId}
                    name={field[0]}
                    placeholder="Escribe aquí"
                    data-group={heading}
                    data-subgroup="third_row"
                    value={field[1]}
                    onChange={(e) => formMethods.handleChange(e, 2)}
                  />
                </td>
              );
            })}
          </tr>
        </>
      ) : (
        <tr>
          <th>
            {heading === "heavenly_stems"
              ? "Troncos celestiales"
              : "Ramas terrestres"}
          </th>
          {Object.entries(form.fields[heading]).map((field, index) => {
            return (
              <td key={index}>
                <input
                  type="text"
                  form="add-patient-bazi-table-form"
                  list={datalistId}
                  name={field[0]}
                  placeholder="Escribe aquí"
                  data-group={heading}
                  value={field[1]}
                  onChange={(e) => formMethods.handleChange(e, 1)}
                />
              </td>
            );
          })}
        </tr>
      )}
    </>
  );
};
