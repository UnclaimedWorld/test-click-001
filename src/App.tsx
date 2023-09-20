import AppHeading from './components/AppHeading';
import RegisterForm from './components/partials/RegisterForm';
import useUsersStore, { UsersContext } from './store/users.store';
import UsersTable from './components/partials/UsersTable';
import {useState} from 'react';
import EditModal from './components/partials/EditModal';
import DeleteModal from './components/partials/DeleteModal';

function App() {
  const usersStore = useUsersStore();

  const [editUser, setEditUser] = useState<number|null>(null);
  const [action, setAction] = useState<string>('');

  const onCloseModal = () => {
    setEditUser(null);
  }
  const onAction = (action: string, user: number) => {
    setAction(action);
    setEditUser(user);
  }

  let modalSection = null;
  if(editUser) {
    const modalProps = {
      user: editUser,
      onClose: onCloseModal
    }
    modalSection = action === 'edit' ? <EditModal {...modalProps}/> : <DeleteModal {...modalProps}/>;
  }

  return (
    <UsersContext.Provider value={usersStore}>
      <main className="bg-[image:linear-gradient(45deg,_rgb(242_242_247_/_0.93),_rgb(242_242_247_/_0.93)),_url('./assets/images/pattern.jpg')] text-[#0E3263] min-h-screen pt-[50px]">
        <div className="flex items-start max-w-[1720px] mx-auto">
          <div className="w-[calc(100%_/_3_-_18px)]">
            <AppHeading>Регистрация</AppHeading>
            <RegisterForm className="bg-white rounded-lg p-9"/>
          </div>
          <div className="ml-9 flex-grow">
            <AppHeading>Зарегистрированные пользователи</AppHeading>
            <UsersTable onAction={onAction}/>
          </div>
        </div>
      </main>
      { modalSection }
    </UsersContext.Provider>
  )
}

export default App;
