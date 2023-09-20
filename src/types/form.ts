import { createContext } from "react";

export const FormContext = createContext<FormContextType | null>(null);
export type FormModelType = Record<string, string>;
export type FormErrorsType = string[];
export interface FormContextType {
  onInput: (name: string, value: string) => void;
  form: FormModelType;
  errors: FormErrorsType;
}
