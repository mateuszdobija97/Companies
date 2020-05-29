import React from 'react';
import '../styles/pagination.css';

const Pagination = ({ companiesPerPage, totalCompanies, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                {}
                {pageNumbers.map(pageNumber => (
                    <li key={pageNumber}>
                        <button id={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;