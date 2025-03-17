export type BaziTableType = {
  heavenly_stems: Record<FourPillars, Stems>;
  earthly_branches: Record<FourPillars, Branches>;
  hidden_stems: {
    principal_qi: Record<FourPillars, Stems>;
    central_qi: Record<FourPillars, Stems>;
    residual_qi: Record<FourPillars, Stems>;
  };
};

export type BaziTableTabularData =
  | HiddenStemsTabularData
  | HeavenlyStemsTabularData
  | EarthlyBranchesTabularData;

type HiddenStemsTabularData = {
  heading: "hidden_stems";
  tabularData: {
    principal_qi: Record<FourPillars, Stems>;
    central_qi: Record<FourPillars, Stems>;
    residual_qi: Record<FourPillars, Stems>;
  };
};

type HeavenlyStemsTabularData = {
  heading: "heavenly_stems";
  tabularData: Record<FourPillars, Stems>;
};

type EarthlyBranchesTabularData = {
  heading: "earthly_branches";
  tabularData: Record<FourPillars, Branches>;
};

export type BaziTableHeadings =
  | "heavenly_stems"
  | "earthly_branches"
  | "hidden_stems";

type FourPillars = "hour" | "day" | "month" | "year";

type Stems =
  | "Madera Yin (Mao)"
  | "Madera Yang (Yin)"
  | "Fuego Yin (Si)"
  | "Fuego Yang (Wu)"
  | "Tierra Yin (Chou)"
  | "Tierra Yin (Wei)"
  | "Tierra Yang (Chen)"
  | "Tierra Yang (Xu)"
  | "Metal Yin (You)"
  | "Metal Yang (Shen)"
  | "Agua Yin (Hai)"
  | "Agua Yang (Zi)"
  | "";

type Branches =
  | "Rata (Zi)"
  | "Buey (Chou)"
  | "Tigre (Yin)"
  | "Conejo (Mao)"
  | "Dragon (Chen)"
  | "Serpiente (Si)"
  | "Caballo (Wu)"
  | "Cabra (Wei)"
  | "Mono (Shen)"
  | "Gallo (You)"
  | "Perro (Xu)"
  | "Cerdo (Hai)"
  | "";
