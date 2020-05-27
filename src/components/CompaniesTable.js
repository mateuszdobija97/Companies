import React from 'react';

const CompaniesTable = ({ companies, sortByNumber, sortByString }) => {
    const companiesItems = companies.map(company => (
        <tr key={company.id}>
            <td>{company.id}</td>
            <td>{company.name}</td>
            <td>{company.city}</td>
            <td>{company.incomes}</td>
            <td>{company.avgIncomes.toFixed(2)}</td>
            <td>{company.lastMonthIncomes}</td>
        </tr>
    ))

    return (
        <table className="table-companies">
            <thead>
                <tr>
                    <th onClick={() => sortByNumber('id')}>Id:</th>
                    <th onClick={() => sortByString('name')}>Name:</th>
                    <th onClick={() => sortByString('city')}>City:</th>
                    <th onClick={() => sortByNumber('incomes')}>Total income:</th>
                    <th onClick={() => sortByNumber('avgIncomes')}>Average income:</th>
                    <th onClick={() => sortByNumber('lastMonthIncomes')}>Last month income:</th>
                </tr>
            </thead>
            <tbody>
                {companiesItems}
            </tbody>
        </table>
    );
}

export default CompaniesTable;