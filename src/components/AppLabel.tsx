import BaseComponentType from "../types/components";

export default function AppLabel(props: BaseComponentType) {
    return <p className="mb-2 text-xs leading-[22px] font-medium">{props.children}</p>
}