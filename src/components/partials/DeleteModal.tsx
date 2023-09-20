import BaseComponentType from "../../types/components";
import AppModal from "../AppModal";
import { UsersContext } from "../../store/users.store";
import { useContext } from "react";
import AppButton from "../AppButton";
import AppForm from "../AppForm";
import api from "../../helpers/api";
import useLoaderComponent from "../../helpers/useLoaderComponent";

interface DeleteModalType extends BaseComponentType {
  user: number;
  onClose: () => void;
}

export default function DeleteModal(props: DeleteModalType) {
  const usersContext = useContext(UsersContext);

  const { submitCallback, LoaderComponent } = useLoaderComponent();

  let name = "";
  const user = usersContext && usersContext.findUser(props.user);
  if (user) {
    name = user.name;
  }

  const onSubmit = () => {
    submitCallback(async () => {
      const { success } = await api.delete("/delete/" + props.user);
      if (success) {
        usersContext?.removeUser(props.user);
      }
      props.onClose();
    });
  };

  return (
    <AppModal name="Редактировать" onCloseModal={props.onClose}>
      <AppForm onSubmit={onSubmit}>
        <p className="mb-6 leading-5 font-medium text-center">
          Вы действительно хотите безвозвратно удалить пользователя {name}?{" "}
          <br /> Восстановить его не получится
        </p>
        <LoaderComponent>
          <AppButton theme="danger" type="submit">
            Удалить
          </AppButton>
        </LoaderComponent>
      </AppForm>
    </AppModal>
  );
}
