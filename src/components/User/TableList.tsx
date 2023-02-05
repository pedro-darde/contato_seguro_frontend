import {Company} from "../../models/Company";
import Table from '@mui/joy/Table';
import {Container, IconButton} from "@mui/joy";
import { BorderColorRounded, Delete } from "@mui/icons-material"
import "./styles/TableList.css"
import {useAlert} from "../../hooks/useAlert";
import {userService} from "../../service/UserService";
import {companyService} from "../../service/CompanyService";
import {toast} from "react-toastify";
import {User} from "../../models/User";

type TableListProps = {
    onDelete: () => void
    onClickEdit: (user: User) => void
    users?: User[]
}
export default function TableList({onClickEdit, onDelete, users}: TableListProps) {
    const { showConfirm } = useAlert()
    const handleDelete = (companyId: number) => {
        showConfirm("Você tem certeza ? O vínculo com empresas sera removido também!").then(res => {
            if (res.isConfirmed) {
                companyService.delete(companyId).then(res => {
                    toast("Usuário removida")
                    onDelete()
                }).catch(err => {
                    console.log(err)
                    toast("Houve um erro ao salvar!", {
                        type: "error"
                    })
                })
            }
        })
    }

    return (
        <Container>
            <Table className={"tableList"}>
                <thead>
                <tr>
                    <th> Nome</th>
                    <th> E-mail </th>
                    <th> Data de Nascimento</th>
                    <th> Cidade de Nascimento</th>
                    <th colSpan={2}> </th>
                </tr>
                </thead>
                <tbody>
                {users?.map(user => (
                    <tr>
                        <td> {user.name} </td>
                        <td> {user.email} </td>
                        <td> {user.birth_date} </td>
                        <td> {user.birth_city} </td>
                        <td colSpan={2}>
                            <div style={{display: "flex"}}>
                                <IconButton sx={{ backgroundColor: "black", color: "white", marginRight: "0.25rem"}} onClick={() => { onClickEdit(user)}} >
                                    <BorderColorRounded />
                                </IconButton>
                                <IconButton sx={{ backgroundColor: "black", color: "white"}} onClick={() => handleDelete(user.id!)}>
                                    <Delete />
                                </IconButton>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}