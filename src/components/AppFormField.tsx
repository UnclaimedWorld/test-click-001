import BaseComponentType from "../types/components";
import AppErrorMessage from "./AppErrorMessage";
import AppInput, { AppInputType } from "./AppInput";
import AppLabel from "./AppLabel";

interface AppFormFieldType extends BaseComponentType, AppInputType {
  label: string;
  type: "textarea" | "input";
  autofocus?: boolean;
}

export default function AppFormField(props: AppFormFieldType) {
  return (
    <label className={"block mb-6 " + props.className}>
      <AppLabel>{props.label}</AppLabel>
      {props.type == "input" ? (
        <AppInput
          autofocus={props.autofocus}
          placeholder={props.placeholder}
          name={props.name}
        />
      ) : null}
      <AppErrorMessage name={props.name} />
    </label>
  );
}
