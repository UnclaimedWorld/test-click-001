import BaseComponentType from "../../types/components";
import AppModal from "../AppModal";
import { UsersContext } from "../../store/users.store";
import { useContext } from "react";
import AppButton from "../AppButton";
import AppForm from "../AppForm";
import api from "../../helpers/api";
import useLoaderComponent from "../../helpers/useLoaderComponent";

interface DeleteModalType extends BaseComponentType {
  user: number|null;
  visible: boolean;
  onClose: () => void;
}
export default function DeleteModal(props: DeleteModalType) {
  const usersContext = useContext(UsersContext);

  const { submitCallback, LoaderComponent } = useLoaderComponent();

  let name = "";
  const user = props.user && usersContext && usersContext.findUser(props.user);
  if (user) {
    name = user.name;
  }

  const onSubmit = () => {
    submitCallback(async () => {
      if(props.user) {
        const { success } = await api.delete("/delete/" + props.user);
        if (success) {
          usersContext?.removeUser(props.user);
        }
        props.onClose();
      }
    });
  };

  return (
    <AppModal visible={props.visible} name="Редактировать" onCloseModal={props.onClose}>
      <AppForm className="flex-grow flex flex-col" onSubmit={onSubmit}>
        <p className="mb-6 leading-5 font-medium text-center">
          Вы действительно хотите безвозвратно удалить пользователя {name}?{" "}
          <br /> Восстановить его не получится
        </p>
        <LoaderComponent className="mt-auto">
          <AppButton theme="danger" type="submit">
            Удалить
          </AppButton>
        </LoaderComponent>
      </AppForm>
    </AppModal>
  );
}
