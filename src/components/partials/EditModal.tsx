import BaseComponentType from "../../types/components";
import AppModal from "../AppModal";
import RegisterForm from "./RegisterForm";

interface EditModalType extends BaseComponentType {
  user: number|null;
  visible: boolean;
  onClose: () => void;
}
export default function EditModal(props: EditModalType) {
  return (
    <AppModal visible={props.visible} name="Редактировать" onCloseModal={props.onClose}>
      <RegisterForm className="flex-grow" user={props.user} onSubmit={props.onClose} />
    </AppModal>
  );
}
