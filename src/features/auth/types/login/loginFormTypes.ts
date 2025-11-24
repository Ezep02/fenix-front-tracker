import { FieldError, UseFormRegister } from "react-hook-form";

export type LoginFormData = {
  email: string
  password: string
  remember_me: boolean
}

export interface LoginFieldProps {
  error?: FieldError;
  name: ValidFieldNames;
  placeholder?: string;
  register: UseFormRegister<LoginFormData>;
  type?: string;
  valueAsNumber?: boolean;
}

export type ValidFieldNames =
  | "email"
  | "password"
  | "remember_me"

