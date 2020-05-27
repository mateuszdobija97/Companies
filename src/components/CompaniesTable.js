import React from 'react';

const CompaniesTable = ({ companies, sortByNumber, sortByString }) => {
    const companiesItems = companies.map(company => (
        <tr key={company.id}>
            <td data-label='Id:'>{company.id}</td>
            <td data-label='Name:'>{company.name}</td>
            <td data-label='City:'>{company.city}</td>
            <td data-label='Total incomes:'>{company.incomes}</td>
            <td data-label='Average incomes:'>{company.avgIncomes.toFixed(2)}</td>
            <td data-label='Last month incomes:'>{company.lastMonthIncomes}</td>
        </tr>
    ))

    return (
        <React.Fragment>
            <div className="responsive-sort" style={{ display: 'none' }}>
                <ul>
                    <li onClick={() => sortByNumber('id')}>Id:</li>
                    <li onClick={() => sortByString('name')}>Name:</li>
                    <li onClick={() => sortByString('city')}>City:</li>
                    <li onClick={() => sortByNumber('incomes')}>Total incomes:</li>
                    <li onClick={() => sortByNumber('avgIncomes')}>Average incomes:</li>
                    <li onClick={() => sortByNumber('lastMonthIncomes')}>Last month incomes:</li>
                </ul>
            </div>
            <table className="table-companies">
                <thead>
                    <tr>
                        <th onClick={() => sortByNumber('id')}>Id:</th>
                        <th onClick={() => sortByString('name')}>Name:</th>
                        <th onClick={() => sortByString('city')}>City:</th>
                        <th onClick={() => sortByNumber('incomes')}>Total incomes:</th>
                        <th onClick={() => sortByNumber('avgIncomes')}>Average incomes:</th>
                        <th onClick={() => sortByNumber('lastMonthIncomes')}>Last month incomes:</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesItems}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default CompaniesTable;