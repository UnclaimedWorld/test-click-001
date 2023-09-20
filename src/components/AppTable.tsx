import BaseComponentType from "../types/components";
import { useState } from "react";
import ToggleMenu from "./partials/ToggleMenu";

type TableHeadSizesType = "large" | "medium" | "small" | "flex";
export interface TableHeadType {
  name: string;
  key: string;
  size?: TableHeadSizesType;
}

const tableHeadSizes = {
  large: "w-[400px]",
  medium: "w-[240px]",
  small: "w-[44px]",
  flex: "w-auto",
};
const Head = (props: { size?: TableHeadSizesType } & BaseComponentType) => {
  let className =
    "pt-[13px] pb-[14px] px-7 bg-[#FAFCFE] text-[12px] leading-[14px] uppercase font-medium text-[#31507D] font-heading text-left rounded-tl-lg rounded-tr-lg ";

  if (props.size) {
    className += tableHeadSizes[props.size];
  }

  return <th className={className}>{props.children}</th>;
};
const Cell = (props: { colSpan?: number } & BaseComponentType) => {
  const className = "w-0 min-w-full text-ellipsis break-words hyphens-auto";
  return (
    <td
      className="pt-[31px] pb-[29px] px-7 border-t border-[#E3EBF4] text-[#1C1C1E] align-baseline"
      colSpan={props.colSpan}
    >
      <div className={className}>{props.children}</div>
    </td>
  );
};

interface AppTableType extends BaseComponentType {
  head: TableHeadType[];
  data: Record<string, any>[];
  onAction: (action: string, id: number) => void;
}

export default function AppTable(props: AppTableType) {
  const [openedMenu, setOpenedMenu] = useState("");

  const head = props.head.map((i) => {
    return (
      <Head key={i.key} size={i.size}>
        {i.name}
      </Head>
    );
  });
  head.push(
    <Head key="2" size="small">
      Действия
    </Head>
  );

  let data = props.data.map((i) => {
    const onAction = (action: string) => {
      props.onAction(action, i.id);
    };
    const setOpened = (isOpened: boolean) => {
      if (openedMenu && i.id !== openedMenu) return;
      if (!isOpened && i.id === openedMenu) {
        setOpenedMenu("");
      } else if (isOpened) {
        setOpenedMenu(i.id);
      }
    };

    return (
      <tr>
        {props.head.map((k: TableHeadType) => {
          return <Cell key={k.key}>{i[k.key] || "-"}</Cell>;
        })}
        <Cell>
          <ToggleMenu
            opened={openedMenu === i.id}
            onAction={onAction}
            setOpened={setOpened}
          />
        </Cell>
      </tr>
    );
  });
  if (!data.length) {
    data = [
      <tr key="empty">
        <Cell colSpan={4}>Пока никого нет(</Cell>
      </tr>,
    ];
  }

  return (
    <table className="bg-white rounded-lg w-full">
      <thead>
        <tr>{...head}</tr>
      </thead>
      <tbody>{...data}</tbody>
    </table>
  );
}
