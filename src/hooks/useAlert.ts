import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const MySwal = withReactContent(Swal);


export const useAlert = () => {
    const showConfirm =  async (message = 'Você tem certeza que deseja remover ?') => {
       return await MySwal.fire({
            icon: "warning",
            text: message,
            showConfirmButton: true,
            showCancelButton: true
        })
    }

    return {
        showConfirm
    }
}