
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CompaniesPage from './pages/CompaniesPage';
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage';


export default function Routes() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route path="/"  exact component={HomePage} />
                <Route path="/users" exact component={UsersPage}  />
                <Route path="/companies" exact component={CompaniesPage}  />
            </Switch>
        </BrowserRouter>
    )
}