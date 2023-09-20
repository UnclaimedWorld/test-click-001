import { useState, createContext } from "react";

export class UserDTO {
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
export interface UsersStore {
    users: Readonly<UserDTO[]>,
    addUser(user: UserDTO): void,
    editUser(user: UserDTO): void,
    findUser(id: number): UserDTO | null
    removeUser(id: number): boolean
}

export const UsersContext = createContext<UsersStore | null>(null);

// Хотел сперва затянуть mobX, но зачем, если useState отлично подходит?
export default function useUsersStore(): UsersStore {
    const [users, setUsers] = useState<UserDTO[]>([]);

    return {
        users,
        addUser(user: any) {
            setUsers(users => [...users, new UserDTO(user)]);
        },
        editUser(user: any) {
            if(!user.id) {
                throw new Error('Поле id обязательно');
            }
            const idx = users.findIndex(u => u.id == user.id);
            if(idx > -1) {
                setUsers(users => {
                    const u = [...users];
                    u.splice(idx, 1, new UserDTO(user));
                    return u;
                });
            } else {
                throw new Error('Не удалось найти пользователя');
            }
        },
        findUser(id) {
            return users.find(u => u.id == id) || null;
        },
        removeUser(id) {
            const newUsers = [...users];
            const idx = newUsers.findIndex(u => u.id == id);
            if(idx > -1) {
                newUsers.splice(idx, 1);
                setUsers(newUsers);
                return true;
            } else {
                return false;
            }
        }
    };
}