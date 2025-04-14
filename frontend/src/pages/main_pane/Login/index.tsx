import { Button } from "../../../components/ui/Button";
import { TextInput } from "../../../components/ui/Input/Text";
import { useLogin } from "../../../features/auth/hooks/useLogin";
import { LoginData } from "../../../features/auth/types/auth.types";
import "./Login.css";

const initialForm: LoginData = {
  email: "",
  password: "",
};

export const Login = () => {
  const { formData, formMethods } = useLogin(initialForm);
  const formId = "login-form";

  return (
    <section className="login">
      <div className="login-content">
        <h1>Inicio de sesión</h1>
        <form id={formId} onSubmit={formMethods.handleSubmit}>
          <TextInput
            type="email"
            label="Correo"
            id="email"
            value={formData.fields.email}
            error={formData.errors.email}
            changeEvent={formMethods.handleChange}
            blurEvent={formMethods.handleBlur}
            required
          />
          <TextInput
            type="password"
            label="Contraseña"
            id="password"
            value={formData.fields.password}
            error={formData.errors.password}
            changeEvent={formMethods.handleChange}
            blurEvent={formMethods.handleBlur}
            required
          />
          <Button
            type="submit"
            form={formId}
            variant="filled"
            label="Iniciar sesión"
          />
        </form>
      </div>
    </section>
  );
};
