import {useEffect, useState} from "react";
import { Company } from "../../models/Company";
import InputMask from 'react-input-mask'
import {
  useForm,
} from "react-hook-form";
import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText,
    FormLabel, Grid,
    Input,
    Modal,
    ModalClose,
    Sheet,
    Typography
} from "@mui/joy";
import {validarCNPJ} from "../../helpers/CnpjValidator";
import {User} from "../../models/User";
import './styles/ModalAddEdit.css'
import {companyService} from "../../service/CompanyService";
import {toast} from "react-toastify";
type ModalAddEditProps = {
  currentCompany?: Company | null;
  visible: boolean;
  onSaved: () => void;
  handleClose(): void;
  users?: User[]
};

export default function ModalAddEdit({ handleClose, onSaved, visible, currentCompany, users }: ModalAddEditProps) {
    const [inputColor, setInputColor] = useState("rgb(216,216,223)")
  useEffect(() => {

    if (visible) {
      handleSetValuesOnOpen();
    }
    return () => {
        reset()
        setInputColor("rgb(216,216,223)")
    }
  }, [visible]);

  const {
    setValue,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues
  } = useForm<Company>({
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
      setValue("users", currentCompany.users);
    }
  };

  const handleChangeOrFocusInput = (e: any) => {
      if (errors.cnpj) {
          setInputColor("red")
      } else {
          if (e.type === 'focus') {
              setInputColor('#096bde')
          } else {
              setInputColor("rgb(216,216,223)")
          }
      }
  }

  const save = async (data: Company) => {
    try {
        if (currentCompany?.id) {
            await edit(data)
        } else {
            await create(data)
        }
        onSaved()
    } catch (e: any) {
        if (e.response?.data) {
            let message = '';
            const errorData = e.response.data
            Object.keys(errorData).forEach(key => {
                message += `${errorData[key][0]} \n`
            })
            toast(message, {
                type: "error",
            })
        } else {
            toast('Ocorreu um erro interno, contate o administrador.', {
                type: "error"
            })
        }
    }
  };

  async function edit(data: any) {
      data.users = data.users?.map((user: any) => user.id) ?? []
      await companyService.update(currentCompany?.id!,data)
  }

  async function create(data: any) {
      data.users = data.users?.map((user: any) => user.id) ?? []
      await companyService.create(data)
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
      open={visible}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: "10"}}
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
                  onFocus={handleChangeOrFocusInput}
                  // className={"inputLike"}
                  mask={"99.999.999/9999-99"}
                  style={{
                      border: `1px solid ${inputColor}`,
                      padding: "0.15rem",
                      borderRadius: "10px",
                      minHeight: "40px"
                  }}
                  {...register("cnpj", {
                      required: true,
                      validate: { validarCNPJ },
                      onChange: handleChangeOrFocusInput
                  })}
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
              {...register("address", {
                  required: "Informe um endereço"})}
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
            {users && users.length ? (
                <FormControl>
                    <FormLabel> Usuários </FormLabel>
                    <Autocomplete value={getValues("users")} options={users} getOptionLabel={item => item.name} multiple onChange={(e, value) => {
                        setValue('users', value)
                    }}/>
                </FormControl>
            ): null}
          <Grid sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
              <Button color='danger' type='button' onClick={() => reset()}> Limpar </Button>
              <Button sx={{ backgroundColor: "black", color: "white" }} type="submit"  disabled={!isValid}> Enviar </Button>
          </Grid>
        </form>
      </Sheet>
    </Modal>
  );
}
