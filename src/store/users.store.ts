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
    addUser(user: UserDTO): void
}

export const UsersContext = createContext<UsersStore | null>(null);

// Хотел сперва затянуть mobX, но зачем, если useState отлично подходит?
export default function useUsersStore(): UsersStore {
    const [users, setUsers] = useState<UserDTO[]>([]);

    return {
        users,
        addUser(user: any) {
            setUsers(users => [...users, new UserDTO(user)]);
        }
    };
}