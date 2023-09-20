import AppHeading from "./components/AppHeading";
import RegisterForm from "./components/partials/RegisterForm";
import useUsersStore, { UsersContext } from "./store/users.store";
import UsersTable from "./components/partials/UsersTable";
import { useState } from "react";
import EditModal from "./components/partials/EditModal";
import DeleteModal from "./components/partials/DeleteModal";
import UsersCards from "./components/partials/UsersCards";
import { useResponsive } from "./helpers/responsive";

function App() {
  const usersStore = useUsersStore();
  const isTablet = useResponsive();

  const onAction = (action: string, user: number) => {
    setAction(action);
    setEditUser(user);
  };

  // editUser и action нужны для модалок редактирования и удаления пользователя. Должны быть связаны между собой
  const [editUser, setEditUser] = useState<number | null>(null);
  const [action, setAction] = useState<string>("");
  
  const modalProps = {
    user: editUser,
    onClose() {
      setEditUser(null);
    },
  };

  const editVisible = action === 'edit' && !!editUser;
  const deleteVisible = action === 'delete' && !!editUser;

  // В мобилке показываем карточки, в десктопе таблицу
  const UsersComponent = isTablet ? UsersTable : UsersCards;

  return (
    <UsersContext.Provider value={usersStore}>
      <div className="selection:bg-[#8294AF]/[.15] selection:text-[#8294AF] text-[#0E3263]">
        <main className="bg-fixed bg-[image:linear-gradient(45deg,_rgb(242_242_247_/_0.93),_rgb(242_242_247_/_0.93)),_url('./assets/images/pattern.jpg')] min-h-screen pt-6 md:pt-[50px] px-5 pb-5 ">
          <div className="flex items-start max-w-[1720px] mx-auto flex-wrap xl:flex-nowrap">
            <section className="mb-9 w-full xl:min-w-[380px] xl:w-[calc(100%_/_3_-_18px)] xl:mb-0 md:w-[600px]">
              <AppHeading>Регистрация</AppHeading>
              <RegisterForm className="bg-white rounded-lg p-5 md:p-9" />
            </section>
            <section className="w-full xl:w-0 xl:flex-grow xl:ml-9">
              <AppHeading>Зарегистрированные пользователи</AppHeading>
              <UsersComponent onAction={onAction} />
            </section>
          </div>
        </main>
        <EditModal visible={editVisible} {...modalProps} />
        <DeleteModal visible={deleteVisible} {...modalProps} />
      </div>
    </UsersContext.Provider>
  );
}

export default App;
