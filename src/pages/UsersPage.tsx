import UserComponent from "../components/user/UserComponent";
import "./styles/usersPage.css"
export default function UsersPage() {

    return (
        <div className="main">
            <h2> Area Usuarios</h2>
            <UserComponent users={[]}/>
        </div>
    )
}