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
interface RegisterFormType extends BaseComponentType {}

export default function RegisterForm(props: RegisterFormType) {
    const usersContext = useContext(UsersContext);

    const createUser = async (form: FormModelType) => {
        try {
            const {data} = await api.post('/create', form);
            usersContext?.addUser(data);
        } catch(e) {
            console.log('Не удалось создать пользователя');
        }
    }

    return (
        <AppForm className={props.className} rules={formRules} onSubmit={createUser}>
            <AppFormField type="input" label="Имя" placeholder="Введите имя" name="name"/>
            <AppFormField type="input" label="Фамилия" placeholder="Введите фамилию" name="surname"/>
            <AppFormField type="input" label="Описание" placeholder="Краткое описание" name="description"/>
            <AppButton type="submit">Добавить</AppButton>
        </AppForm>
    )
}