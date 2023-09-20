import AppHeading from './components/AppHeading';
import RegisterForm from './components/partials/RegisterForm';
import useUsersStore, { UsersContext } from './store/users.store';
import UsersTable from './components/partials/UsersTable';
import {useEffect, useState} from 'react';
import EditModal from './components/partials/EditModal';
import DeleteModal from './components/partials/DeleteModal';
import UsersCards from './components/partials/UserCards';

const MOBILE_BOUNDARY = 1280;

function App() {
  const usersStore = useUsersStore();
  const [isTable, setIsTable] = useState(window.innerWidth > MOBILE_BOUNDARY);
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

  useEffect(() => {
    const resize = () => {
      if(!isTable && window.innerWidth > MOBILE_BOUNDARY) {
        setIsTable(true);
      } else if(isTable && window.innerWidth <= MOBILE_BOUNDARY) {
        setIsTable(false);
      }
    }
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    }
  });

  return (
    <UsersContext.Provider value={usersStore}>
      <div className="selection:bg-[#8294AF]/[.15] selection:text-[#8294AF] text-[#0E3263]">
        <main className="bg-fixed bg-[image:linear-gradient(45deg,_rgb(242_242_247_/_0.93),_rgb(242_242_247_/_0.93)),_url('./assets/images/pattern.jpg')] min-h-screen pt-[50px] px-5 pb-5 ">
          <div className="flex items-start max-w-[1720px] mx-auto flex-wrap xl:flex-nowrap">
            <div className="mb-9 w-full xl:min-w-[380px] xl:w-[calc(100%_/_3_-_18px)] xl:mb-0 md:w-[600px]">
              <AppHeading>Регистрация</AppHeading>
              <RegisterForm className="bg-white rounded-lg p-9"/>
            </div>
            <div className="w-full xl:w-0 xl:flex-grow xl:ml-9">
              <AppHeading>Зарегистрированные пользователи</AppHeading>
              {
                isTable ? <UsersTable onAction={onAction}/> : <UsersCards onAction={onAction}/>
              }
            </div>
          </div>
        </main>
        { modalSection }
      </div>
    </UsersContext.Provider>
  )
}

export default App;
