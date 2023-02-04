import "./styles.css"
import { Button } from "@mui/joy"
import { useHistory } from "react-router-dom"
export default function HeaderComponent() {
    return (
        <header className="header">
            <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo" />
            <Button sx={{ height: "20px"}} onClick={() => window.location.href = "/"}> Voltar </Button>
        </header>
    )
}