import { Company } from "../../models/Company"
import CrudHeader from "../CrudHeader/CrudHeader"


type CompanyComponentProps = {
    companies: Company[]
}
export default function CompanyComponent({ companies }: CompanyComponentProps) {
    const filterFields = [
        { label: "Nome", value: "name" },
        { label: "CNPJ", value: "cnpj"},
        { label: "Endereco", value: "address"}
    ]
    
    return (
        <div>
            <CrudHeader 
                onAddClick={() => {}}
                onSearch={(value, field) => {}}
                searchFieldOption={filterFields}
            />
        </div>
    )
}