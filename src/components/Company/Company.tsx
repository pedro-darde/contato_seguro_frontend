import { useState } from "react";
import { Company } from "../../models/Company";
import CrudHeader from "../CrudHeader/CrudHeader";
import ModalAddEdit from "./ModalAddEdit";

type CompanyComponentProps = {
  companies: Company[];
};
export default function CompanyComponent({ companies }: CompanyComponentProps) {
  const filterFields = [
    { label: "Nome", value: "name" },
    { label: "CNPJ", value: "cnpj" },
    { label: "Endereco", value: "address" },
  ];
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <CrudHeader
        onAddClick={() => {
          setShowModal(true);
        }}
        onSearch={(value, field) => {}}
        searchFieldOption={filterFields}
      />
      <ModalAddEdit
        handleClose={() => setShowModal(false)}
        onSaved={() => setShowModal(false)}
        visible={showModal}
      />
    </div>
  );
}
