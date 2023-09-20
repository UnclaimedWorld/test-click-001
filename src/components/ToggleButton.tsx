import BaseComponentType from "../types/components";

interface ToggleButtonType extends BaseComponentType {
  toggled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ToggleButton(props: ToggleButtonType) {
  let className =
    props.className +
    " w-11 h-11 mx-auto rounded-xl border-2  text-[#91A1B9] p-0 flex items-center justify-center ";
  if (props.toggled) {
    className += "bg-[#E3EBF4] border-[#E3EBF4]";
  } else {
    className += "bg-white border-[#E5E5EA]";
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
