import {Company} from "./Company";

export type User = {
    id?: number,
    name: string,
    cellphone: string,
    birth_date: string,
    birth_city: string,
    email: string,
    companies: Company[]
}