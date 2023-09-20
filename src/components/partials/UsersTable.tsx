import { UsersContext } from "../../store/users.store";
import BaseComponentType from "../../types/components";
import AppTable from "../AppTable";
import {useContext} from 'react';

const tableHead = [
    {
      name: 'Имя',
      key: 'name'
    },
    {
      name: 'Фамилия',
      key: 'surname'
    },
    {
      name: 'Описание',
      key: 'description'
    },
];

interface UsersTableType extends BaseComponentType {
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

export default function UsersTable(props: UsersTableType) {
    const usersContext = useContext(UsersContext);
    const users = [...(usersContext?.users || [])];

    const onAction = (action: string, id: number) => {
        if(action === 'edit') {
            props.onEdit(id);
        } else if(action === 'delete') {
            props.onDelete(id);
        }
    }

    return <AppTable head={tableHead} data={users} onAction={onAction}/>
}