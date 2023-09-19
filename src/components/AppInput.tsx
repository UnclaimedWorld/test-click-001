import BaseComponentType from "../types/components";
import { useFormContext } from "../helpers/form";

export interface AppInputType extends BaseComponentType {
    placeholder?: string
    name: string
}

export default function AppInput({placeholder, name, className}: AppInputType) {
    const {value, isError, onInput} = useFormContext(name);

    if(!className) {
        className = '';
    }

    if(isError) {
        className += ' border-[#FD033F]';
    } else {
        className += ' border-[#DCE3EB]';
    }
    return <input value={value} className={`${className} py-[15px] px-[19px] border rounded-[14px] bg-white text-normal font-medium h-[57px] w-full placeholder:text-[#91A1B9]`} placeholder={placeholder} onInput={onInput}/>
}