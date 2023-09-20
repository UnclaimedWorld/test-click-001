import { UsersContext } from "../../store/users.store";
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
export default function UsersTable() {
    const usersContext = useContext(UsersContext);
    const users = [...(usersContext?.users || [])];

    return <AppTable head={tableHead} data={users}/>
}