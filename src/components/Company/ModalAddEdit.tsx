import { useEffect, useState } from "react";
import { Company } from "../../models/Company"

type ModalAddEditProps = {
    currentCompany?: Company,
    visible: boolean,
    onSaved: () => void;
    handleClose(): void
}
export default function ModalAddEdit({ handleClose, onSaved, visible, currentCompany }: ModalAddEditProps) {
    const [name, setName] = useState<string>("")
    const [cnpj, setCNPJ] = useState<string>("")
    const [address, setAddress] = useState<string>("")

    const [errors, setErrors] = useState<{}>({
        "name": '',
        
    })
    
    useEffect(() => {
        if (visible) handleSetValuesOnOpen()
     }, [visible])

    const handleSetValuesOnOpen = () => {
        if (currentCompany) {
            setName(currentCompany.name)
            setCNPJ(currentCompany.cnpj)
            setAddress(currentCompany.address)
        }
    }
}