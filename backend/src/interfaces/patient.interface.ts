export interface IPatient {
  personal_data: {
    first_name: string;
    last_name: string;
    age?: number;
    mail?: string;
    marital_status?: "single" | "married";
    tel?: number;
    profile_picture?: string;
  };
  birth?: {
    date?: string;
    time?: string;
    location?: string;
    bazi_table?: {
      heavenly_stems: string[];
      earthly_branches: string[];
      hidden_branches: string[];
    };
  };
  presumptive_analysis?: {
    meridian_time: string;
    feeding: string;
    yin: string;
    yang: string;
    qi: string;
    xue: string;
    jin_ye: string;
    mental_vitality_jing_shen: string;
    ancestral_jing: string;
  };
  chief_complaints?: ChiefComplaintRef[];
  appointmens?: AppointmentRef[];
  reports?: ReportRef[];
}

interface ChiefComplaintRef {
  chief_complaint: string;
}
interface AppointmentRef {
  appointment: string;
}
interface ReportRef {
  report: string;
}

const examplePatient = {
  personal_data: {
    first_name: "Luca",
    last_name: "Barneto",
    age: 21,
    mail: "lucabarneto@gmail.com",
    marital_status: "single",
    tel: 1169771691,
    profile_picture: "src/public/img/cv-foto.jpg",
  },
  birth: {
    date: "28/04/2003",
    time: "12:05",
    location: "Caballito",
    bazi_table: {
      heavenly_stems: {
        hour: "Agua Yang",
        day: "Agua Yang",
        month: "Agua Yang",
        year: "Tierra Yang",
      },
      earthly_branches: {
        hour: "Rata Zi",
        day: "Tigre Yin",
        month: "Mono Shen",
        year: "Tigre Yin",
      },
      hidden_branches: {
        hour: ["Agua Yin", "", ""],
        day: ["Madera Yang", "Fuego Yang", "Tierra Yang"],
        month: ["Agua Yin", "", ""],
        year: ["Metal Yang", "Agua Yang", "Tierra Yang"],
      },
    },
  },
  presumptive_analysis: {
    meridian_time: "example text",
    feeding: "example text",
    yin: "example text",
    yang: "example text",
    qi: "example text",
    xue: "example text",
    jin_ye: "example text",
    mental_vitality_jing_shen: "example text",
    ancestral_jing: "example text",
  },
};
