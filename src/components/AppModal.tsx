import BaseComponentType from "../types/components";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import AppIcon from "./AppIcon";

interface AppModalType extends BaseComponentType {
  name: string;
  visible: boolean;
  onCloseModal: () => void;
}

function ModalLayout(props: AppModalType) {
  const ref = useRef<HTMLElement>(null);

  let modalClassName =
    "flex fixed z-10 top-0 left-0 w-full h-full bg-[rgba(50,_71,_101,_0.47)] overflow-auto md:py-9 md:px-6 ";
  let modalWindowClassName =
    "bg-white shadow-[0px_5px_15px_rgba(145,_161,_185,_0.15)] m-auto relative w-full min-h-screen md:max-w-[562px] md:rounded-xl md:min-h-0 ";

  if (!props.visible) {
    modalClassName += "animate-opacityOut ";
    modalWindowClassName += "animate-dropOut ";
  } else {
    modalClassName += "animate-opacity ";
    modalWindowClassName += "animate-drop ";
  }

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    };
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  });

  const onCloseModal = () => {
    props.onCloseModal();
  };
  const onClickModal: React.MouseEventHandler<HTMLElement> = (e) => {
    if (ref.current === e.target) {
      onCloseModal();
    }
  };

  return (
    <article className={modalClassName} onClick={onClickModal} ref={ref}>
      <div className={modalWindowClassName}>
        <h3 className="pt-6 px-9 pb-5 border-b border-[#E3EBF4] text-[18px] leading-7 font-bold text-[#31507D]">
          {props.name}
        </h3>
        <button
          className="w-[30px] h-[30px] p-1 absolute right-[22px] top-[22px] rounded-[10px] bg-[#E3EBF4] text-[#91A1B9] cursor-pointer"
          onClick={onCloseModal}
        >
          <span className="absolute top-0 left-0 right-0 bottom-0 block -m-3"></span>
          <AppIcon icon="close" size={20} />
        </button>
        <div className="pt-6 px-9 pb-9">{props.children}</div>
      </div>
    </article>
  );
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
