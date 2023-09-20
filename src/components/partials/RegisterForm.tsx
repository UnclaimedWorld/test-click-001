import api from "../../helpers/api";
import { UsersContext } from "../../store/users.store";
import BaseComponentType from "../../types/components";
import AppButton from "../AppButton";
import AppForm, { FormModelType } from "../AppForm";
import AppFormField from "../AppFormField";
import {useContext} from 'react';

const formRules = {
    name: 'required',
    surname: 'required',
};
interface RegisterFormType extends BaseComponentType {
    user?: Number
    onSubmit?: () => void
}

export default function RegisterForm(props: RegisterFormType) {
    const usersContext = useContext(UsersContext);

    let initialForm: FormModelType = {};
    if(props.user && usersContext) {
        const users = usersContext.users;
        let user = users.find(user => user.id === props.user);
        if(user) {
            initialForm = { 
                name: user.name,
                surname: user.surname,
                description: user.description,
             };
        }
    }

    const buttonName = props.user ? 'Редактировать' : 'Добавить';

    const onSubmit = async (form: FormModelType) => {
        let url = '/create';
        let method = api.post.bind(api);
        let finish = usersContext?.addUser;
        if(props.user) {
            url = '/update/' + props.user;
            method = api.put.bind(api);
            finish = usersContext?.editUser;
        } 
        try {
            const {data} = await method(url, form);
            finish?.(data);
        } catch(e) {
            // Можно показывать сообщение об ошибке, если пользователь не найден
            console.log(e);
        } finally {
            props.onSubmit?.();
        }
    }

    return (
        <AppForm className={props.className} initialForm={initialForm} rules={formRules} onSubmit={onSubmit}>
            <AppFormField type="input" label="Имя" placeholder="Введите имя" name="name"/>
            <AppFormField type="input" label="Фамилия" placeholder="Введите фамилию" name="surname"/>
            <AppFormField type="input" label="Описание" placeholder="Краткое описание" name="description"/>
            <AppButton type="submit">{ buttonName }</AppButton>
        </AppForm>
    )
}