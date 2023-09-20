import BaseComponentType from "../../types/components";
import AppModal from "../AppModal";
import { UsersContext } from "../../store/users.store";
import { useContext } from 'react';
import AppButton from "../AppButton";
import AppForm from "../AppForm";
import api from "../../helpers/api";

interface DeleteModalType extends BaseComponentType {
    user: number
    onClose: () => void
}

export default function DeleteModal(props: DeleteModalType) {
    const usersContext = useContext(UsersContext);

    let name = '';
    const user = usersContext && usersContext.findUser(props.user);
    if(user) {
        name = user.name;
    }

    const onSubmit = async () => {
        try {
            const {success} = await api.delete('/delete/' + props.user);
            if(success) {
                usersContext?.removeUser(props.user);
            }
            props.onClose();
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <AppModal name="Редактировать" onCloseModal={props.onClose}>
            <AppForm onSubmit={onSubmit}>
                <p className="mb-6 leading-5 font-medium text-center">Вы действительно хотите безвозвратно удалить пользователя { name }? <br/> Восстановить его не получится</p>
                <AppButton theme="danger" type="submit">Удалить</AppButton>
            </AppForm>
        </AppModal>
    )
}