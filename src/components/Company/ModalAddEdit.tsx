import { useEffect } from "react";
import { Company } from "../../models/Company";
import InputMask from 'react-input-mask'
import {
  useForm,
} from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel, Grid,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import {validarCNPJ} from "../../helpers/CnpjValidator";
type ModalAddEditProps = {
  currentCompany?: Company;
  visible: boolean;
  onSaved: () => void;
  handleClose(): void;
};

export default function ModalAddEdit({
  handleClose,
  onSaved,
  visible,
  currentCompany,
}: ModalAddEditProps) {
  useEffect(() => {
    reset()
    if (visible) {
      handleSetValuesOnOpen();
    }
  }, [visible]);

  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
    reset,

  } = useForm({
    values: {
      name: "",
      cnpj: "",
      address: "",
      users: [],
    },
    mode: "all",
  });

  const handleSetValuesOnOpen = () => {
    if (currentCompany) {
      setValue("name", currentCompany.name);
      setValue("cnpj", currentCompany.cnpj);
      setValue("address", currentCompany.address);
      setValue("users", currentCompany.users as never[]);
    }
  };

  const save = async (data: any) => {
    // const ok = handleSubmit()
    console.log("asdasdasdmkas");
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
      open={visible}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * var(--IconButton-size))",
            right: "calc(-1/4 * var(--IconButton-size))",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.body",
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          Inserir
        </Typography>
        <form id="modal-body" onSubmit={handleSubmit(save)} style={{ width: "450px" }}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              {...register("name", { required: "Informe um nome" })}
              error={!!errors.name}
            />
            {errors.name && (
              <FormHelperText
                sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
              >
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>CNPJ</FormLabel>
              <InputMask
                    mask={"99.999.999/9999-99"}
                  {...register("cnpj", { required: true,  validate: { validarCNPJ }})}
                  // error={!!errors.cnpj}
              ></InputMask>
            {errors.cnpj && (

              <FormHelperText
                sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
              >
                {errors.cnpj.type === 'validarCNPJ' ? 'Informe um CNPJ válido': 'Informe um CNPJ'}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Endereço</FormLabel>
            <Input
              {...register("address", { required: "Informe um endereço" })}
              error={!!errors.address}
            />
            {errors.address && (
              <FormHelperText
                sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
              >
                {errors.address.message}
              </FormHelperText>
            )}
          </FormControl>
          <Grid sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
              <Button color='danger' type='button' onClick={() => reset()}> Limpar </Button>
              <Button sx={{ backgroundColor: "black", color: "white" }} type="submit"> Enviar </Button>
          </Grid>
        </form>
      </Sheet>
    </Modal>
  );
}
