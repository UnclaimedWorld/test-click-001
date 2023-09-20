import AppHeading from './components/AppHeading';
import AppForm, { FormModelType } from './components/AppForm';
import AppButton from './components/AppButton';
import AppFormField from './components/AppFormField';
import api from './helpers/api';
import {useState} from 'react';
import AppTable from './components/AppTable';

const formRules = {
  name: 'required',
  surname: 'required',
}

class UserDTO {
  name: string;
  surname: string;
  description: string;
  id: number;
  constructor(user: any) {
    this.name = user.name;
    this.surname = user.surname;
    this.description = user.description;
    this.id = user.id;
  }
}

const tableHead = [
  {
    name: 'Имя',
    key: 'name'
  },
  {
    name: 'Фамилия',
    key: 'surname'
  },
  {
    name: 'Описание',
    key: 'description'
  },
]

function App() {
  const [users, setUsers] = useState<UserDTO[]>([]);

  const createUser = async (form: FormModelType) => {
    try {
      const {data} = await api.post('/create', form);
      setUsers(users => [...users, new UserDTO(data)]);
    } catch(e) {
      console.log('Не удалось создать пользователя');
    }
  }

  
  return (
    <main className="bg-[image:linear-gradient(45deg,_rgb(242_242_247_/_0.93),_rgb(242_242_247_/_0.93)),_url('./assets/images/pattern.jpg')] text-[#0E3263] min-h-screen pt-[50px]">
      <div className="flex items-start max-w-[1720px] mx-auto">
        <div className="w-[calc(100%_/_3_-_18px)]">
          <AppHeading>Регистрация</AppHeading>
          <AppForm className="bg-white rounded-lg p-9" rules={formRules} onSubmit={createUser}>
            <AppFormField type="input" label="Имя" placeholder="Введите имя" name="name"/>
            <AppFormField type="input" label="Фамилия" placeholder="Введите фамилию" name="surname"/>
            <AppFormField type="input" label="Описание" placeholder="Краткое описание" name="description"/>
            <AppButton type="submit">Добавить</AppButton>
          </AppForm>
        </div>
        <div className="ml-9 flex-grow">
          <AppHeading>Зарегистрированные пользователи</AppHeading>
          <AppTable head={tableHead} data={users}/>
        </div>
      </div>
    </main>
  )
}

export default App;
