import CompanyComponent from "../components/Company/Company";

export default function CompaniesPage() {
    return (
        <div className="main">
        <h2> Area Empresas</h2>
        <CompanyComponent companies={[]}/>
    </div>
    )
}