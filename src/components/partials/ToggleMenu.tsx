import useClickOutsideRef from "../../helpers/clickOutside";
import BaseComponentType from "../../types/components";
import ToggleButton from "../ToggleButton";
import { useState, forwardRef } from "react";
import AppIcon from "../AppIcon";

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
const ActionsMenu = forwardRef<
  HTMLUListElement,
  { onAction: (action: string) => void } & BaseComponentType
>((props, ref) => {
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

interface ToggleMenuType extends BaseComponentType {
  opened: boolean;
  setOpened: (state: boolean) => void;
  onAction: (action: string) => void;
}
export default function ToggleMenu(props: ToggleMenuType) {
  const [isMenuOut, setIsMenuOut] = useState(false);

  const openMenu = () => {
    props.setOpened(true);
  };
  const closeMenu = () => {
    setIsMenuOut(true);
    setTimeout(() => {
      props.setOpened(false);
      setIsMenuOut(false);
    }, 250);
  };
  const toggleMenu = () => {
    if (props.opened) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const ref = useClickOutsideRef<HTMLUListElement>(() => {
    closeMenu();
  });

  const onTogglerClick: React.MouseEventHandler = () => {
    setTimeout(toggleMenu);
  };

  const onAction = (action: string) => {
    props.onAction(action);
    closeMenu();
  };

  return (
    <div className={props.className}>
      <div className="relative">
        <ToggleButton toggled={props.opened} onClick={onTogglerClick}>
          <AppIcon icon="more" />
        </ToggleButton>
        {props.opened && (
          <ActionsMenu
            className={
              "absolute top-full right-0 mt-2 w-[180px] z-[1] " +
              (isMenuOut ? "animate-dropOut" : "animate-drop")
            }
            ref={ref}
            onAction={onAction}
          />
        )}
      </div>
    </div>
  );
}
