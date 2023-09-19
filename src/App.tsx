import { ReactComponent as MoreIcon } from './assets/icons/more.svg';
import AppHeading from './components/AppHeading';
import AppForm, { FormModelType } from './components/AppForm';
import AppButton from './components/AppButton';
import AppFormField from './components/AppFormField';

const createUser = (form: FormModelType) => {
  console.log(form);
}
const formRules = {
  name: 'required',
  surname: 'required',
}

function App() {

  return (
    <main className="bg-[#F2F2F7] text-[#0E3263] min-h-screen pt-[50px]">
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
          <p className="mb-9 text-[28px] font-bold leading-[28px]">Зарегистрированные пользователи</p>
          <table className="bg-white rounded-lg w-full">
            <thead>
              <tr>
                <th className="pt-[13px] pb-[14px] px-7 bg-[#FAFCFE] text-[12px] leading-[14px] uppercase font-medium text-[#31507D] font-heading text-left rounded-tl-lg">Имя</th>
                <th>Фамилия</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pt-[31px] pb-[29px] px-7 border-t border-[#E3EBF4] text-[#1C1C1E]">Иван</td>
                <td>Ващенко</td>
                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dolore?</td>
                <td>
                  <button className="w-11 h-11 rounded-xl bg-[#E3EBF4] text-[#91A1B9] p-0 flex items-center justify-center">
                    <MoreIcon className="svg-icon"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default App
