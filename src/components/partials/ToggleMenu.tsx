import useClickOutsideRef from "../../helpers/clickOutside";
import BaseComponentType from "../../types/components";
import ToggleButton from "../ToggleButton";
import { useState } from "react";
import AppIcon from "../AppIcon";
import ActionsMenu from "./ActionsMenu";

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
              (isMenuOut ? "motion-safe:animate-dropOut" : "motion-safe:animate-drop")
            }
            ref={ref}
            onAction={onAction}
          />
        )}
      </div>
    </div>
  );
}
