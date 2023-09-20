import BaseComponentType from "../types/components"
import { useState, createContext } from "react";

interface AppFormType extends BaseComponentType {
    rules?: FormModelType,
    onSubmit: (form: FormModelType) => void
}

export type FormModelType = Record<string, string>;
type FormErrorsType = string[];
interface FormContextType {
    onInput: (name: string, value: string) => void
    form: FormModelType
    errors: FormErrorsType
}

export const FormContext = createContext<FormContextType|null>(null);

export default function AppForm(props: AppFormType) {
    const [form, setForm] = useState<FormModelType>({});
    const [errors, setError] = useState<FormErrorsType>([]);

    const onInput = (name: string, value: string) => {
        if(errors.includes(name) && value.length) {
            setError(old => {
                const newErrors = [...old];
                newErrors.splice(newErrors.indexOf(name), 1);
                return newErrors;
            });
        }
        setForm(f => ({...f, [name]: value}));
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(props.rules) {
            let isPrevented = false;
    
            Object.entries(props.rules).forEach(([key, value]) => {
                if(value === 'required' && !form[key]) {
                    isPrevented = true;
                    setError(e => [ ...e, key ]);
                }
            });
    
            if(!isPrevented) {
                props.onSubmit(form);
                setForm({});
            }
        } else {
            props.onSubmit(form);
        }
    }

    return <FormContext.Provider value={{form, onInput, errors}}>
        <form className={props.className} onSubmit={onSubmit}>{props.children}</form>
    </FormContext.Provider>
}