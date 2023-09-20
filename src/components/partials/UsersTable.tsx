import { UsersContext } from "../../store/users.store";
import BaseComponentType from "../../types/components";
import AppTable, { TableHeadType } from "../AppTable";
import {useContext} from 'react';

const tableHead: TableHeadType[] = [
  {
    name: 'Имя',
    key: 'name',
    size: 'medium'
  },
  {
    name: 'Фамилия',
    key: 'surname',
    size: 'medium'
  },
  {
    name: 'Описание',
    key: 'description',
    size: 'flex'
  },
];

interface UsersTableType extends BaseComponentType {
  onAction: (action: string, id: number) => void
}

export default function UsersTable(props: UsersTableType) {
  const usersContext = useContext(UsersContext);
  const users = [...(usersContext?.users || [])];

  return <AppTable head={tableHead} data={users} onAction={props.onAction}/>
}