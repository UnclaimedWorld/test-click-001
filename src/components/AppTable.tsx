import BaseComponentType from "../types/components";
import { ReactComponent as MoreIcon } from '../assets/icons/more.svg';
import { useState, useRef, forwardRef } from "react";
import useClickOutsideRef from "../helpers/clickOutside";

interface TableHeadType {
    name: string, key: string
}

interface AppTableType extends BaseComponentType {
    head: TableHeadType[]
    data: Record<string, any>[]
}

const Head = (props: BaseComponentType) => {
    return <th className="pt-[13px] pb-[14px] px-7 bg-[#FAFCFE] text-[12px] leading-[14px] uppercase font-medium text-[#31507D] font-heading text-left rounded-tl-lg last:w-[10px]">{ props.children }</th>
};
const Cell = (props: {colSpan?: number} & BaseComponentType) => {
    return <td className="pt-[31px] pb-[29px] px-7 border-t border-[#E3EBF4] text-[#1C1C1E]" colSpan={props.colSpan}>{ props.children }</td>
};

const actions = [
    {
        name: 'Редактировать',
        key: 'edit'
    },
    {
        name: 'Удалить',
        key: 'delete'
    }
]
const ActionsMenu = forwardRef((props: BaseComponentType, ref) => {
    return <ul className={props.className + ` p-1 rounded-xl bg-white shadow-[0px_5px_15px_rgba(145,_161,_185,_0.15)]`} ref={ref}>
        {
            actions.map(i => <li key={i.key} className="px-4 py-2 font-heading font-medium text-sm text-[#8294AF] rounded-xl hover:bg-[#F5F7F8] cursor-pointer">{ i.name }</li>)
        }
    </ul>
});

export default function AppTable(props: AppTableType) {
    const [openedMenu, setOpenedMenu] = useState('');
    const [isMenuOut, setIsMenuOut] = useState(false);

    const head = props.head.map(i => {
        return <Head key={i.key}>{ i.name }</Head>
    });
    head.push(<Head key="2">Действия</Head>);

    const toggleMenu = (key?: string) => {
        if(openedMenu && !key) {
            setIsMenuOut(true);
            setTimeout(() => {
                setOpenedMenu('');
                setIsMenuOut(false);
            }, 250);
        } else if(key) {
            setOpenedMenu(key);
        }
    }

    const ref = useClickOutsideRef(() => {
        toggleMenu();
    });

    let data = props.data.map(i => {
        const onTogglerClick: React.MouseEventHandler = (e) => {
            setTimeout(() => {
                toggleMenu(i.id);
            });
        };

        let className = "w-11 h-11 mx-auto rounded-xl border-2  text-[#91A1B9] p-0 flex items-center justify-center ";
        if(openedMenu === i.id) {
            className += "bg-[#E3EBF4] border-[#E3EBF4]";
        } else {
            className += "bg-white border-[#E5E5EA]";
        }

        return <tr>
            { 
                props.head.map((k: TableHeadType) => {
                    return <Cell key={k.key}>{i[k.key] || '-'}</Cell>
                })
            }
            <Cell>
                <div className="relative">
                    <button className={className} onClick={onTogglerClick}>
                        <MoreIcon className="svg-icon"/>
                    </button>
                    {
                        openedMenu === i.id && <ActionsMenu className={"absolute top-full right-0 mt-2 w-[180px] z-[1] " + (isMenuOut ? 'animate-dropOut' : 'animate-drop')} ref={ref}/>
                    }
                </div>
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