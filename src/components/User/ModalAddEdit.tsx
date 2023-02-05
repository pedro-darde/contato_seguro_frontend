import {useEffect, useState} from "react";
import { Company } from "../../models/Company";
import InputMask from 'react-input-mask'
import {
  useForm,
} from "react-hook-form";
import {
    Autocomplete, Box,
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
import {userService} from "../../service/UserService";
type ModalAddEditProps = {
  currentUser?: User | null;
  visible: boolean;
  onSaved: () => void;
  handleClose(): void;
  companies?: Company[]
};

export default function ModalAddEdit({ handleClose, onSaved, visible, currentUser, companies }: ModalAddEditProps) {
  useEffect(() => {
    return () => {
        reset()
    }
  }, [visible]);

  const {
    setValue,
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,


  } = useForm<User>({
    values: {
      name: "",
      email: "",
      birth_date: "",
      birth_city: "",
      cellphone: "",
      companies: [],
    },
    mode: "all",
  });

  const handleSetValuesOnOpen = () => {
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);
      setValue("birth_date",currentUser.birth_date);
      setValue("birth_city",currentUser.birth_city);
      setValue("companies", currentUser.companies);
    }
  };

  const save = async (data: any) => {
    try {
        console.log(data)
        if (currentUser?.id) {
            await edit(data)
        } else {
            await create(data)
        }
        console.log("to no on saved")
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
      data.companies = data.companies.map((item: any) => item.id) ?? []
      await userService.update(currentUser?.id!,data)
  }

  async function create(data: any) {
      data.companies = data.companies.map((item: any) => item.id) ?? []
      await userService.create(data)
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
            <FormLabel>E-mail</FormLabel>
            <Input
                type={"email"}
              {...register("email", {
                  required: "Informe um e-mail"})}
              error={!!errors.email}
            />
            {errors.email && (
              <FormHelperText
                sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
              >
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>

            <Grid container spacing={2}>
                <Grid xs={6}>
                    <FormControl>
                        <FormLabel>Telefone</FormLabel>
                        <Input
                            type={""}
                            {...register("cellphone", {
                                required: "Informe um Telefone"})}
                            error={!!errors.cellphone}
                        />
                        {errors.cellphone && (
                            <FormHelperText
                                sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
                            >
                                {errors.cellphone.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Input
                            type={"date"}
                            {...register("birth_date", {
                                required: "Informe uma Data de nascimento"})}
                            error={!!errors.birth_date}
                        />
                        {errors.birth_date && (
                            <FormHelperText
                                sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
                            >
                                {errors.birth_date.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl>
                <FormLabel>Cidade de nascimento</FormLabel>
                <Input
                    {...register("birth_city", {
                        required: "Informe uma Cidade de nascimento"})}
                    error={!!errors.birth_city}
                />
                {errors.birth_city && (
                    <FormHelperText
                        sx={{ color: "red", fontStyle: "italic", fontSize: "0.75rem" }}
                    >
                        {errors.birth_city.message}
                    </FormHelperText>
                )}
            </FormControl>
            {companies && companies.length ? (
                <FormControl>
                    <FormLabel> Empresas </FormLabel>
                    <Autocomplete options={companies} getOptionLabel={item => item.name} multiple onChange={(e, value) => {
                        setValue('companies', companies)
                    }}  />
                </FormControl>
            ): null}
            <p> { JSON.stringify(isValid)}</p>
          <Grid sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
              <Button color='danger' type='button' onClick={() => reset()}> Limpar </Button>
              <Button sx={{ backgroundColor: "black", color: "white" }} type="submit"  disabled={!isValid}> Enviar </Button>
          </Grid>
        </form>
      </Sheet>
    </Modal>
  );
}
