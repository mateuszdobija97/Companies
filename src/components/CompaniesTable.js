import React from 'react';

const CompaniesTable = ({ companies, sortByNumber, sortByString, sort }) => {
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
                    <li onClick={() => sort('number', 'id')}>Id:</li>
                    <li onClick={() => sort('string', 'name')}>Name:</li>
                    <li onClick={() => sort('string', 'city')}>City:</li>
                    <li onClick={() => sort('number', 'incomes')}>Total incomes:</li>
                    <li onClick={() => sort('number', 'avgIncomes')}>Average incomes:</li>
                    <li onClick={() => sort('number', 'lastMonthIncomes')}>Last month incomes:</li>
                </ul>
            </div>
            <table className="table-companies">
                <thead>
                    <tr>
                        <th onClick={() => sort('number', 'id')}>Id:</th>
                        <th onClick={() => sort('string', 'name')}>Name:</th>
                        <th onClick={() => sort('string', 'city')}>City:</th>
                        <th onClick={() => sort('number', 'incomes')}>Total incomes:</th>
                        <th onClick={() => sort('number', 'avgIncomes')}>Average incomes:</th>
                        <th onClick={() => sort('number', 'lastMonthIncomes')}>Last month incomes:</th>
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