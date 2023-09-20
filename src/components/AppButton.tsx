import BaseComponentType from "../types/components";

interface AppButtonType extends BaseComponentType {
  type: "button" | "submit" | "reset";
  theme?: "danger";
}

export default function AppButton(props: AppButtonType) {
  let className =
    "py-5 rounded-xl border-0 w-full text-[18px] font-bold text-white focus:ring select-none active:scale-95 motion-safe:transition-transform ";
  if (props.theme) {
    className += "bg-[#FD033F]";
  } else {
    className += "bg-[#267FFF]";
  }
  return <button className={className}>{props.children}</button>;
}
