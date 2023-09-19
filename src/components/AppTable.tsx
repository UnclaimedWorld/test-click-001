import BaseComponentType from "../types/components";
import { ReactComponent as MoreIcon } from '../assets/icons/more.svg';

interface TableHeadType {
    name: string, key: string
}

interface AppTableType extends BaseComponentType {
    head: TableHeadType[]
    data: Record<string, any>[]
}

const Head = (props: BaseComponentType) => {
    return <th className="pt-[13px] pb-[14px] px-7 bg-[#FAFCFE] text-[12px] leading-[14px] uppercase font-medium text-[#31507D] font-heading text-left rounded-tl-lg last:w-[10px]">{ props.children }</th>
}
const Cell = (props: {colSpan?: number} & BaseComponentType) => {
    return <td className="pt-[31px] pb-[29px] px-7 border-t border-[#E3EBF4] text-[#1C1C1E]" colSpan={props.colSpan}>{ props.children }</td>
}

export default function AppTable(props: AppTableType) {
    const head = props.head.map(i => {
        return <Head key={i.key}>{ i.name }</Head>
    });
    head.push(<Head key="2">Действия</Head>);

    let data = props.data.map(i => {
        return <tr>
            { 
                props.head.map((k: TableHeadType) => {
                    return <Cell key={k.key}>{i[k.key] || '-'}</Cell>
                })
            }
            <Cell>
                <button className="w-11 h-11 mx-auto rounded-xl bg-[#E3EBF4] text-[#91A1B9] p-0 flex items-center justify-center">
                    <MoreIcon className="svg-icon"/>
                </button>
            </Cell>
        </tr>
    });
    if(!data.length) {
        data = [<tr key="empty">
            <Cell colSpan={4}>Пока ничего нет(</Cell>
        </tr>];
    }

    return (
        <table className="bg-white rounded-lg w-full">
            <thead>
                <tr>{...head}</tr>
            </thead>
            <tbody>
                { ...data }
            </tbody>
          </table>
    )
}