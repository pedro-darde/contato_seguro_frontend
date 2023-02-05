import {useState} from "react";
import {Company} from "../../models/Company";
import CrudHeader from "../CrudHeader/CrudHeader";
import ModalAddEdit from "./ModalAddEdit";
import {User} from "../../models/User";
import {toast} from "react-toastify";
import TableList from "./TableList";
import {debounce} from "lodash";
import {companyService} from "../../service/CompanyService";
import {FilterOptions} from "../../service/BaseService";

type CompanyComponentProps = {
    companies?: Company[];
    users?: User[],
    refetechUsers: (options?: FilterOptions) => void
};
export default function UserComponent({companies, users, refetechUsers}: CompanyComponentProps) {
    const filterFields = [
        {label: "Nome", value: "name"},
        {label: "E-mail", value: "email"},
        {label: "Data de nascimento", value: "birth_date"},
        {label: "Cidade de nascimento", value: "birth_city"},
    ];
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const onSave = () => {
        toast('Usuário salva com sucesso!')
        refetechUsers()
        setShowModal(false)
    }

    const onClickEdit = (u: User) => {
        setCurrentUser(u)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setCurrentUser(null)
        setShowModal(false)
    }

    const filter = debounce((value, column) => {
        let options: FilterOptions = {
            searchValue: value,
            searchField: column,
            searchOperation: "="
        }
        if (column === 'email') options.searchOperation = 'ilike'
        if (column === 'name') options.searchOperation = 'ilike'
        refetechUsers(options)
    }, 200)


    return (
        <div>
            <CrudHeader
                onAddClick={() => {
                    setShowModal(true);
                }}
                onSearch={filter}
                searchFieldOption={filterFields}
                searchAll={() => refetechUsers()}
            />
            <TableList users={users} onClickEdit={onClickEdit} onDelete={refetechUsers}/>
            <ModalAddEdit
                companies={companies}
                handleClose={onCloseModal}
                onSaved={onSave}
                visible={showModal}
                currentUser={currentUser}
            />
        </div>
    );
}
