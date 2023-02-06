import {Company} from "../../models/Company";
import Table from '@mui/joy/Table';
import {Container, IconButton} from "@mui/joy";
import { BorderColorRounded, Delete } from "@mui/icons-material"
import "./styles/TableList.css"
import {useAlert} from "../../hooks/useAlert";
import {userService} from "../../service/UserService";
import {companyService} from "../../service/CompanyService";
import {toast} from "react-toastify";

type TableListProps = {
    onDelete: () => void
    onClickEdit: (company: Company) => void
    companies?: Company[]
}
export default function TableList({onClickEdit, onDelete, companies}: TableListProps) {
    const { showConfirm } = useAlert()
    const handleDelete = (companyId: number) => {
        showConfirm("Você tem certeza? O vínculo com os usuários será removido também.").then(res => {
            if (res.isConfirmed) {
                companyService.delete(companyId).then(res => {
                    toast("Empresa removida com sucesso.", {
                        type: "success"
                    })
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
                    <th> CNPJ</th>
                    <th> Endereço</th>
                    <th colSpan={2}> </th>
                </tr>
                </thead>
                <tbody>
                {companies?.map(company => (
                    <tr>
                        <td> {company.name} </td>
                        <td> {company.cnpj} </td>
                        <td> {company.address} </td>
                        <td colSpan={2}>
                            <div style={{display: "flex"}}>
                                <IconButton sx={{ backgroundColor: "black", color: "white", marginRight: "0.25rem"}} onClick={() => { onClickEdit(company)}} >
                                    <BorderColorRounded />
                                </IconButton>
                                <IconButton sx={{ backgroundColor: "black", color: "white"}} onClick={() => handleDelete(company.id!)}>
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