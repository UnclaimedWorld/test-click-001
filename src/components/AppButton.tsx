import BaseComponentType from "../types/components";

interface AppButtonType extends BaseComponentType {
    type: 'button' | 'submit' | 'reset'
}

export default function AppButton(props: AppButtonType) {
    return <button className="py-5 rounded-xl bg-[#267FFF] border-0 w-full text-[18px] font-bold text-white">{ props.children }</button>
}