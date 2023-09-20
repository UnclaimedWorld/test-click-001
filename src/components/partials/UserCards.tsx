import { UsersContext } from "../../store/users.store";
import { useContext, useState } from "react";
import ToggleMenu from "./ToggleMenu";
import BaseComponentType from "../../types/components";

const fields: { name: string; key: "name" | "description" | "surname" }[] = [
  {
    name: "Имя",
    key: "name",
  },
  {
    name: "Фамилия",
    key: "surname",
  },
  {
    name: "Описание",
    key: "description",
  },
];

interface UsersTableType extends BaseComponentType {
  onAction: (action: string, id: number) => void;
}
export default function UsersCards(props: UsersTableType) {
  const usersContext = useContext(UsersContext);
  const users = [...(usersContext?.users || [])];

  const [opened, setOpened] = useState<number | null>(null);

  if (!users.length) {
    return (
      <div className="flex-grow p-8 rounded-xl bg-white relative">
        Пока никого нет(
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -ml-6 -mt-6">
      {users.map((user) => {
        const onAction = (action: string) => {
          props.onAction(action, user.id);
        };
        const toggleOpened = (isOpened: boolean) => {
          if (opened && user.id !== opened) return;
          if (isOpened) {
            setOpened(user.id);
          } else {
            setOpened(null);
          }
        };

        return (
          <div
            className="flex-grow ml-6 mt-6 p-5 md:p-9 rounded-xl bg-white relative min-w-[200px] min-[420px]:min-w-[380px] max-w-full"
            key={user.id}
          >
            <ToggleMenu
              className="absolute top-3 right-3"
              opened={opened == user.id}
              setOpened={toggleOpened}
              onAction={onAction}
            />
            {fields.map((field) => {
              return (
                <div className="mb-8" key={field.key}>
                  <p className="text-[15px] font-medium leading-5 mb-4">
                    {field.name}
                  </p>
                  <p className="text-[20px] font-bold leading-[1] mb-4">
                    {user[field.key] || "-"}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
