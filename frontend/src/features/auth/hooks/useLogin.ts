import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { LoginData } from "../types/auth.types";
import { useAppDispatch } from "../../../app/store";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { loginUser } from "../services/authThunk";

export const useLogin = (initialForm: LoginData) => {
  const dispatch = useAppDispatch();
  const { appNavigate } = useAppNavigate();
  const form = useForm(initialForm);
  const { formData } = form;

  useEffect(() => {
    if (formData.isSubmittable)
      dispatch(loginUser(formData.fields)).then(() => appNavigate("/patients"));
  }, [formData.isSubmittable]);

  return form
};
