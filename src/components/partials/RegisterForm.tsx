import api from "../../helpers/api";
import { UsersContext } from "../../store/users.store";
import BaseComponentType from "../../types/components";
import AppButton from "../AppButton";
import AppForm, { FormModelType } from "../AppForm";
import AppFormField from "../AppFormField";
import { useContext } from "react";
import useLoaderComponent from "../../helpers/useLoaderComponent";

const formRules = {
  name: "required",
  surname: "required",
};
interface RegisterFormType extends BaseComponentType {
  user?: number|null;
  onSubmit?: () => void;
}

export default function RegisterForm(props: RegisterFormType) {
  const usersContext = useContext(UsersContext);

  const { submitCallback, LoaderComponent } = useLoaderComponent();

  let initialForm: FormModelType = {};
  if (props.user && usersContext) {
    const users = usersContext.users;
    const user = users.find((user) => user.id === props.user);
    if (user) {
      initialForm = {
        name: user.name,
        surname: user.surname,
        description: user.description,
      };
    }
  }

  const buttonName = props.user ? "Редактировать" : "Добавить";

  const onSubmit = async (form: FormModelType) => {
    await submitCallback(
      async () => {
        let url = "/create";
        let method = api.post.bind(api);
        let finish = usersContext?.addUser;
        if (props.user) {
          url = "/update/" + props.user;
          method = api.put.bind(api);
          finish = usersContext?.editUser;
        }
        const { data } = await method(url, form);
        finish?.(data);
      },
      () => {
        props.onSubmit?.();
      }
    );
  };

  return (
    <AppForm
      className={props.className}
      initialForm={initialForm}
      rules={formRules}
      onSubmit={onSubmit}
    >
      <AppFormField
        autofocus
        type="input"
        label="Имя"
        placeholder="Введите имя"
        name="name"
      />
      <AppFormField
        type="input"
        label="Фамилия"
        placeholder="Введите фамилию"
        name="surname"
      />
      <AppFormField
        type="input"
        label="Описание"
        placeholder="Краткое описание"
        name="description"
      />
      <LoaderComponent>
        <AppButton type="submit">{buttonName}</AppButton>
      </LoaderComponent>
    </AppForm>
  );
}
