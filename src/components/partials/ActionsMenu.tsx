import BaseComponentType from "../../types/components";
import { forwardRef } from "react";

const actions = [
  {
    name: "Редактировать",
    key: "edit",
  },
  {
    name: "Удалить",
    key: "delete",
  },
];
export default forwardRef<
  HTMLUListElement,
  { onAction: (action: string) => void } & BaseComponentType
>(function ActionsMenu(props, ref) {
  return (
    <ul
      ref={ref}
      className={
        props.className +
        ` p-1 rounded-xl bg-white shadow-[0px_5px_15px_rgba(145,_161,_185,_0.15)]`
      }
    >
      {actions.map((i) => {
        const clickHandler: React.MouseEventHandler = () => {
          props.onAction(i.key);
        };
        return (
          <li
            key={i.key}
            className="px-4 py-2 font-heading font-medium text-sm text-[#8294AF] rounded-xl hover:bg-[#F5F7F8] select-none cursor-pointer"
            onClick={clickHandler}
          >
            {i.name}
          </li>
        );
      })}
    </ul>
  );
});
