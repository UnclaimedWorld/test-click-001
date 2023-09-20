import BaseComponentType from "../../types/components";
import AppModal from "../AppModal";
import RegisterForm from "./RegisterForm";

interface EditModalType extends BaseComponentType {
    user: number
    onClose: () => void
}

export default function EditModal(props: EditModalType) {
    return <AppModal name="Редактировать" onCloseModal={props.onClose}>
        <RegisterForm user={props.user} onSubmit={props.onClose}/>
    </AppModal>
}