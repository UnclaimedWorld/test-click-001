import { useRef, useEffect } from "react";
import AppIcon from "./AppIcon";
import { AppModalType } from "./AppModal";

export default function ModalLayout(props: AppModalType) {
  const ref = useRef<HTMLElement>(null);

  let modalClassName =
    "flex fixed z-10 top-0 left-0 w-full h-full bg-[rgba(50,_71,_101,_0.47)] overflow-auto md:py-9 md:px-6 ";
  let modalWindowClassName =
    "flex flex-col bg-white shadow-[0px_5px_15px_rgba(145,_161,_185,_0.15)] m-auto relative w-full min-h-screen md:max-w-[562px] md:rounded-xl md:min-h-0 ";

  if (!props.visible) {
    modalClassName += "motion-safe:animate-opacityOut ";
    modalWindowClassName += "motion-safe:animate-dropOut ";
  } else {
    modalClassName += "motion-safe:animate-opacity ";
    modalWindowClassName += "motion-safe:animate-drop ";
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
        <h3 className="flex-shrink-0 pt-6 px-9 pb-5 border-b border-[#E3EBF4] text-[18px] leading-7 font-bold text-[#31507D]">
          {props.name}
        </h3>
        <button
          className="w-[30px] h-[30px] p-1 absolute right-[22px] top-[22px] rounded-[10px] bg-[#E3EBF4] text-[#91A1B9] cursor-pointer"
          onClick={onCloseModal}
        >
          <span className="absolute top-0 left-0 right-0 bottom-0 block -m-3"></span>
          <AppIcon icon="close" size={20} />
        </button>
        <section className="pt-6 px-9 pb-9 flex-grow max-md:h-fit flex flex-col">{props.children}</section>
      </div>
    </article>
  );
}
