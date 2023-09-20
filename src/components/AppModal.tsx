import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import BaseComponentType from '../types/components';
import { useRef } from 'react';

interface AppModalType extends BaseComponentType {
    name: string
    onCloseModal: () => void
}

export default function AppModal(props: AppModalType) {
    let modalClassName = "flex fixed z-10 top-0 left-0 w-full h-full py-9 px-6 bg-[rgba(50,_71,_101,_0.47)] animate-opacity";

    const ref = useRef<HTMLElement>(null);

    const onCloseModal = () => {
        props.onCloseModal();
    }
    const onClickModal: React.MouseEventHandler<HTMLElement> = (e) => {
        if(ref.current === e.target) {
            onCloseModal();
        }
    }

    return <article className={modalClassName} onClick={onClickModal} ref={ref}>
        <div className="bg-white shadow-[0px_5px_15px_rgba(145,_161,_185,_0.15)] rounded-xl m-auto max-w-[562px] w-full relative animate-drop">
            <h3 className="pt-6 px-9 pb-5 border-b border-[#E3EBF4] text-[18px] leading-7 font-bold text-[#31507D]">{props.name}</h3>
            <button className="w-[30px] h-[30px] p-1 absolute right-[22px] top-[22px] rounded-[10px] bg-[#E3EBF4] text-[#91A1B9] cursor-pointer" onClick={onCloseModal}>
                <span className="absolute top-0 left-0 right-0 bottom-0 block -m-3"></span>
                <CloseIcon className="w-full h-full block svg-icon"/>
            </button>
            <div className="pt-6 px-9 pb-9">{props.children}</div>
        </div>
    </article>
}