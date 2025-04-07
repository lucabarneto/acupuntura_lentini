import { UseForm } from "../../../../../hooks/useForm";
import {
  BaziTableType,
  BaziTableHeadings,
} from "../../../types/bazi_table.types";

type Props = {
  heading: BaziTableHeadings;
  form: UseForm<BaziTableType>;
  formId: string;
  datalistId: string;
};

export const BaziTableInputRow = (props: Props) => {
  const { heading, form, formId, datalistId } = props;
  const { formData, formMethods } = form;

  const principalQi = formData.fields.hidden_stems.principal_qi;
  const centralQi = formData.fields.hidden_stems.central_qi;
  const residualQi = formData.fields.hidden_stems.residual_qi;

  return (
    <>
      {heading === "hidden_stems" ? (
        <>
          <tr>
            <th rowSpan={3}>Troncos ocultos</th>
            {Object.entries(principalQi).map((field, index) => {
              return (
                <td key={index}>
                  <input
                    type="text"
                    form={formId}
                    list={datalistId}
                    name={field[0]}
                    placeholder="Escribe aquí"
                    data-group={heading}
                    data-subgroup="principal_qi"
                    value={field[1]}
                    onChange={(e) => formMethods.handleChange(e, 2)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            {Object.entries(centralQi).map((field, index) => {
              return (
                <td key={index}>
                  <input
                    type="text"
                    form={formId}
                    list={datalistId}
                    name={field[0]}
                    placeholder="Escribe aquí"
                    data-group={heading}
                    data-subgroup="central_qi"
                    value={field[1]}
                    onChange={(e) => formMethods.handleChange(e, 2)}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            {Object.entries(residualQi).map((field, index) => {
              return (
                <td key={index}>
                  <input
                    type="text"
                    form={formId}
                    list={datalistId}
                    name={field[0]}
                    placeholder="Escribe aquí"
                    data-group={heading}
                    data-subgroup="residual_qi"
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
          {Object.entries(formData.fields[heading]).map((field, index) => {
            return (
              <td key={index}>
                <input
                  type="text"
                  form={formId}
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
