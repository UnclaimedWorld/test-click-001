import BaseComponentType from "../types/components";

export default function AppHeading(props: BaseComponentType) {
    return <p className="mb-9 text-[28px] font-bold leading-[28px]">{props.children}</p>
}