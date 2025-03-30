export type IChiefComplaint = {
  _id: string;
  title: string;
  diagnosis: string;
  initial_sleep_condition: string;
  initial_medicine: string;
  state: "finished" | "in_progress" | "abandoned";
  patient: string;
};

export type IChiefComplaintNoId = Omit<IChiefComplaint, "_id">;

export type IChiefComplaintForm = Omit<IChiefComplaintNoId, "state">;

export interface ChiefComplaintRef {
  chief_complaint: IChiefComplaint;
}
