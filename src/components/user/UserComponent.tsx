import { User } from "../../models/User"
import CrudHeader from "../CrudHeader/CrudHeader"


type UserComponentProps = {
    users: User[]
}
export default function UserComponent({ users }: UserComponentProps) {
    const filterFields = [
        { label: "Nome", value: "name" },
        { label: "Email", value: "email"},
        { label: "Data de nascimento", value: "birth_date" },
        { label: "Cidade de nascimento", value: "birth_city"},
    ]
    
    return (
        <div>
            <CrudHeader 
                onAddClick={() => {}}
                onSearch={(value, field) => {

                }}
                searchFieldOption={filterFields}
            />
        </div>
    )
}