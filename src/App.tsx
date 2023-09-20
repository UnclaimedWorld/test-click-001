import AppHeading from './components/AppHeading';
import AppModal from './components/AppModal';
import RegisterForm from './components/partials/RegisterForm';
import useUsersStore, { UsersContext } from './store/users.store';
import UsersTable from './components/partials/UsersTable';

function App() {
  const usersStore = useUsersStore();

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
            <UsersTable/>
          </div>
        </div>
      </main>
      <AppModal name="Редактировать">
        <RegisterForm/>
      </AppModal>
    </UsersContext.Provider>
  )
}

export default App;
