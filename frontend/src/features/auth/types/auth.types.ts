export type LoginData = {
  email: string;
  password: string;
};

export type AuthSliceState = {
  loading: "idle" | "pending";
  authenticated: boolean;
  token: string | null;
  user: DataSafeUser | null;
};

type DataSafeUser = {
  first_name: string;
  last_name: string;
  role: "admin" | "user";
};
