import { FormFields } from "../../../types/form.types";

export const patientInitialForm: FormFields = {
  first_name: {
    value: "",
    required: true,
    regex: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
  },
  last_name: {
    value: "",
    required: true,
    regex: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
  },
  age: {
    value: "",
    required: true,
    regex: /[0-9]{1,3}/,
  },
  mail: {
    value: "",
    required: true,
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  tel: {
    value: "",
    required: true,
    regex: /[0-9]+/,
  },
  marital_status: {
    value: "",
    required: true,
  },
  profile_picture: {
    value: "",
  },

  date: {
    group: ["birth"],
    value: "",
  },
  time: {
    group: ["birth"],
    value: "",
    regex: /\d{2}:\d{2}:\d{2}/,
  },
  location: {
    group: ["birth"],
    value: "",
  },

  meridian_time: {
    group: ["presumptive_analysis"],
    value: "",
  },

  feeding: {
    group: ["presumptive_analysis"],
    value: "",
  },

  yin: {
    group: ["presumptive_analysis"],
    value: "",
  },

  yang: {
    group: ["presumptive_analysis"],
    value: "",
  },

  qi: {
    group: ["presumptive_analysis"],
    value: "",
  },

  xue: {
    group: ["presumptive_analysis"],
    value: "",
  },

  jin_ye: {
    group: ["presumptive_analysis"],
    value: "",
  },

  mental_vitality_jing_shen: {
    group: ["presumptive_analysis"],
    value: "",
  },

  ancestral_jing: {
    group: ["presumptive_analysis"],
    value: "",
  },
};
