import React from 'react';
import Item from './Item'

const ListItems = ({ companies }) => {

    let i = 0; // table numering
    const company = companies.map(company => <Item key={company.id} company={company} i={i++} />)

    return (
        <table className="table-companies">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id:</th>
                    <th>Name:</th>
                    <th>City:</th>
                    <th>Total income:</th>
                    <th>Average income:</th>
                    <th>Last month income:</th>
                </tr>
            </thead>
            <tbody>
                {company}
            </tbody>
        </table>
    );
}

export default ListItems;