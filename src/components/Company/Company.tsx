import {useState} from "react";
import {Company} from "../../models/Company";
import CrudHeader from "../CrudHeader/CrudHeader";
import ModalAddEdit from "./ModalAddEdit";
import {User} from "../../models/User";
import {toast} from "react-toastify";
import TableList from "./TableList";
import {debounce} from "lodash";
import {FilterOptions} from "../../service/BaseService";

type CompanyComponentProps = {
    companies?: Company[];
    users?: User[],
    refetchCompanies: (options?: FilterOptions) => void
};
export default function CompanyComponent({companies, users, refetchCompanies}: CompanyComponentProps) {
    const filterFields = [
        {label: "Nome", value: "name"},
        {label: "CNPJ", value: "cnpj"},
        {label: "Endereco", value: "address"},
    ];
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentCompany, setCurrentCompany] = useState<Company | null>(null)
    const onSave = () => {
        toast('Empresa salvo com sucesso!', {
            type: "success"
        })
        refetchCompanies()
        setShowModal(false)
    }

    const onClickEdit = (c: Company) => {
        setCurrentCompany(c)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setCurrentCompany(null)
        setShowModal(false)
    }

    const filter = debounce((value, column) => {
        let options: FilterOptions = {
            searchValue: value,
            searchField: column,
            searchOperation: "ilike"
        }
        refetchCompanies(options)
    }, 200)


    return (
        <div>
            <CrudHeader
                onAddClick={() => {
                    setShowModal(true);
                }}
                onSearch={filter}
                searchFieldOption={filterFields}
                searchAll={() => refetchCompanies()}
            />
            <TableList companies={companies} onClickEdit={onClickEdit} onDelete={refetchCompanies}/>
            <ModalAddEdit
                users={users}
                handleClose={onCloseModal}
                onSaved={onSave}
                visible={showModal}
                currentCompany={currentCompany}
            />
        </div>
    );
}
