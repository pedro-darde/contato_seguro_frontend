import "./styles.css"
export default function HeaderComponent() {
    return (
        <header className="header">
            <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo" />
        </header>
    )
}