import BaseComponentType from "../types/components";
import { useFormContext } from "../helpers/form";

export interface AppInputType extends BaseComponentType {
  name: string;
  placeholder?: string;
  autofocus?: boolean;
}

export default function AppInput({
  placeholder,
  name,
  className,
  autofocus,
}: AppInputType) {
  const { value, isError, onInput } = useFormContext(name);

  if (!className) {
    className =
      "py-[15px] px-[19px] border rounded-[14px] bg-white text-normal font-medium h-[57px] w-full placeholder:text-[#91A1B9] focus:border-[#267FFF] ";
  }

  if (isError) {
    className += "border-[#FD033F]";
  } else {
    className += "border-[#DCE3EB]";
  }
  return (
    <input
      value={value}
      className={className}
      placeholder={placeholder}
      autoFocus={autofocus}
      onInput={onInput}
    />
  );
}
