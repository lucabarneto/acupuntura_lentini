import { UseForm } from "../../../../hooks/useForm";
import { BaziTable } from "../../../patients/components/BaziTable";
import { BaziTableType } from "../../../patients/types/bazi_table.types";

type Props = {
  formData: UseForm<BaziTableType>;
  formId: string;
};

export const AddBaziTableForm = (props: Props) => {
  const { formData, formId } = props;
  const { handleSubmit } = formData.formMethods;

  return (
    <>
      <h2>Tabla BaZi</h2>
      <form id={formId} onSubmit={handleSubmit}></form>
      <BaziTable variant="form" formId={formId} formData={formData} />

      <datalist id="stems">
        <option value="Agua Yang (Zi)"></option>
        <option value="Agua Yin (Hai)"></option>
        <option value="Fuego Yang (Wu)"></option>
        <option value="Fuego Yin (Si)"></option>
        <option value="Madera Yang (Yin)"></option>
        <option value="Madera Yin (Mao)"></option>
        <option value="Metal Yang (Shen)"></option>
        <option value="Metal Yin (You)"></option>
        <option value="Tierra Yang (Chen)"></option>
        <option value="Tierra Yang (Xu)"></option>
        <option value="Tierra Yin (Chou)"></option>
        <option value="Tierra Yin (Wei)"></option>
      </datalist>
      <datalist id="branches">
        <option value="Buey (Chou)"></option>
        <option value="Caballo (Wu)"></option>
        <option value="Cabra (Wei)"></option>
        <option value="Cerdo (Hai)"></option>
        <option value="Conejo (Mao)"></option>
        <option value="Dragon (Chen)"></option>
        <option value="Gallo (You)"></option>
        <option value="Mono (Shen)"></option>
        <option value="Perro (Xu)"></option>
        <option value="Rata (Zi)"></option>
        <option value="Serpiente (Si)"></option>
        <option value="Tigre (Yin)"></option>
      </datalist>
    </>
  );
};
