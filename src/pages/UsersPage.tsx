import "./styles/usersPage.css"
import {useEffect, useState} from "react";
import {Company} from "../models/Company";
import {User} from "../models/User";
import {userService} from "../service/UserService";
import {FilterOptions} from "../service/BaseService";
import {companyService} from "../service/CompanyService";
import UserComponent from "../components/User/User";
export default function UsersPage() {
    const [companies, setCompanies] = useState<Company[]>()
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        (async () => {
            await fetchCompanies()
            await fetchUsers()
        })()

        return () => {
            setCompanies([])
            setUsers([])
        }
    }, [])

    async function fetchUsers(options?: FilterOptions) {
        const users = await userService.list<User[]>(options)
        setUsers(users)
    }

    async function fetchCompanies() {
        const companies = await companyService.list<Company[]>()
        setCompanies(companies)
    }
    return (
        <div className="main">
            <h2> Área Usuários </h2>
            <UserComponent users={users} refetechUsers={fetchUsers}  companies={companies}/>
        </div>
    )
}