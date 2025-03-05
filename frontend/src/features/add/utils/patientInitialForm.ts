import { FormFields } from "../../../types/form.types";

export const patientInitialForm: FormFields = {
  first_name: {
    type: "text",
    value: "",
    required: true,
    regex: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
  },
  last_name: {
    type: "text",
    value: "",
    required: true,
    regex: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
  },
  age: {
    type: "text",
    value: "",
    required: true,
    regex: /[0-9]{1,3}/,
  },
  mail: {
    type: "text",
    value: "",
    required: true,
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  tel: {
    type: "text",
    value: "",
    required: true,
    regex: /[0-9]+/,
  },
  marital_status: {
    type: "text",
    value: "",
    required: true,
  },
  profile_picture: {
    type: "file",
    value: "",
  },

  date: {
    type: "text",
    group: ["birth"],
    value: "",
  },
  time: {
    type: "text",
    group: ["birth"],
    value: "",
    regex: /\d{2}:\d{2}/,
  },
  location: {
    type: "text",
    group: ["birth"],
    value: "",
  },

  meridian_time: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  feeding: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  yin: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  yang: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  qi: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  xue: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  jin_ye: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  mental_vitality_jing_shen: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },

  ancestral_jing: {
    type: "text",
    group: ["presumptive_analysis"],
    value: "",
  },
};
