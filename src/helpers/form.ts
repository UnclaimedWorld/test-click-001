import { useContext } from "react";
import { FormContext } from "../types/form";

export const useFormContext = (name: string) => {
  const context = useContext(FormContext);

  const value = context ? context.form[name] || "" : "";
  const isError = context?.errors.includes(name) || false;
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (context) {
      // Это всё ради типизации
      if ("value" in e.target) {
        context.onInput(name, String(e.target.value));
      }
    }
  };

  return {
    value,
    isError,
    onInput,
  };
};
