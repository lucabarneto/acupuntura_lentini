export type IChiefComplaint = {
  _id: string;
  title: string;
  description: string;
  daignosis: string;
  initial_sleep_condition: string;
  initial_medicine: string;
  state: "finished" | "in_progress" | "abandoned";
  patient: string;
};

export type IChiefComplaintNoId = Omit<IChiefComplaint, "_id">;
