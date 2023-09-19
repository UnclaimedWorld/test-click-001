import { useContext } from "react";
import { FormContext } from "../components/AppForm";

export const useFormContext = (name: string) => {
    const context = useContext(FormContext);

    const value = context ? context.form[name] || '' : '';
    const isError = context?.errors.includes(name) || false;
    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
        if(context) {
            context.onInput(name, e.target.value);
        }
    }

    return {
        value,
        isError,
        onInput,
    }
}