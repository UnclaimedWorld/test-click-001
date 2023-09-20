import BaseComponentType from "../types/components";
import { useState, useLayoutEffect } from "react";
import ModalLayout from "./AppModalLayout";

export interface AppModalType extends BaseComponentType {
  name: string;
  visible: boolean;
  onCloseModal: () => void;
}

export default function AppModal(props: AppModalType) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOut, setIsOut] = useState(false);

  const onCloseModal = () => {
    setIsOut(true);
    setTimeout(() => {
      props.onCloseModal();
      setIsVisible(false);
    }, 250);
  };
  const onOpenModal = () => {
    setIsOut(false);
    setIsVisible(true);
  };

  useLayoutEffect(() => {
    if (!props.visible) {
      onCloseModal();
    } else {
      onOpenModal();
    }
  }, [props.visible]);

  if (!isVisible) return null;

  return (
    <ModalLayout visible={!isOut} onCloseModal={onCloseModal} name={props.name}>
      {props.children}
    </ModalLayout>
  );
}
