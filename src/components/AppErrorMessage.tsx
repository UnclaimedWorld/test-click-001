import BaseComponentType from '../types/components';
import { useFormContext } from '../helpers/form';

interface AppErrorMessageType extends BaseComponentType {
    name: string
}

export default function AppErrorMessage({name}: AppErrorMessageType) {
    const { isError } = useFormContext(name);
    if(!isError) return null;
    return <p className="mt-2 text-[#FD033F] text-[14px] leading-5 font-medium">Поле {name} обязательно для заполнения</p>
}