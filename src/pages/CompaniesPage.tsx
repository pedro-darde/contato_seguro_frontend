import CompanyComponent from "../components/Company/Company";
import {useEffect, useState} from "react";
import {Company} from "../models/Company";
import {companyService} from "../service/CompanyService";
import {User} from "../models/User";
import {userService} from "../service/UserService";
import TableList from "../components/Company/TableList";
import {FilterOptions} from "../service/BaseService";

export default function CompaniesPage() {
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

    async function fetchUsers() {
        const users = await userService.list<User[]>()
        setUsers(users)
    }

    async function fetchCompanies(options?: FilterOptions) {
        const companies = await companyService.list<Company[]>(options)
        setCompanies(companies)
    }


    return (
        <div className="main">
            <h2> Área Empresas</h2>
            <CompanyComponent companies={companies} users={users} refetchCompanies={fetchCompanies}/>
        </div>
    )
}