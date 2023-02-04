
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CompanyPage from './pages/CompanyPage';
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage';


export default function Routes() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route path="/"  exact component={HomePage} />
                <Route path="/users" exact component={UsersPage}  />
                <Route path="/companies" exact component={CompanyPage}  />
            </Switch>
        </BrowserRouter>
    )
}