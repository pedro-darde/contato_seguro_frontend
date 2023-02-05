import {User} from "./User";

export type Company = {
    id?: number,
    name: string,
    cnpj: string,
    address: string,
    users: Array<User>
}