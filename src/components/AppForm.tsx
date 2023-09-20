import BaseComponentType from "../types/components";
import { useState } from "react";
import { FormContext, FormErrorsType, FormModelType } from "../types/form";

interface AppFormType extends BaseComponentType {
  rules?: FormModelType;
  initialForm?: FormModelType;
  onSubmit?: (form: FormModelType) => void;
}

export default function AppForm(props: AppFormType) {
  const [form, setForm] = useState<FormModelType>(props.initialForm || {});
  const [errors, setError] = useState<FormErrorsType>([]);

  const onInput = (name: string, value: string) => {
    if (errors.includes(name) && value.length) {
      setError((old) => {
        const newErrors = [...old];
        newErrors.splice(newErrors.indexOf(name), 1);
        return newErrors;
      });
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (props.rules) {
      let isPrevented = false;

      Object.entries(props.rules).forEach(([key, value]) => {
        if (value === "required" && !form[key]) {
          isPrevented = true;
          setError((e) => [...e, key]);
        }
      });

      if (!isPrevented) {
        await props.onSubmit?.(form);
        setForm({});
      }
    } else {
      props.onSubmit?.(form);
    }
  };

  return (
    <FormContext.Provider value={{ form, onInput, errors }}>
      <form className={props.className} onSubmit={onSubmit}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}
