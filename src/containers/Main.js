import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompaniesTable from '../components/CompaniesTable';
import Pagination from '../components/Pagination';

const Main = () => {

    const [companiesDetails, setCompaniesDetails] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [sortDesc, setSortDesc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(20);

    // get data
    const getCompanies = async () => {
        const mappedItems = []
        axios.get('https://recruitment.hal.skygate.io/companies').then(companiesListResponse => {
            companiesListResponse.data.map(company => (
                axios.get(`https://recruitment.hal.skygate.io/incomes/${company.id}`).then((companyResponse) => {
                    const basicCompanyName = companiesListResponse.data.find(company => company.id === companyResponse.data.id)
                    const result = {
                        id: basicCompanyName.id,
                        name: basicCompanyName.name,
                        city: basicCompanyName.city,
                        incomes: computeIncomes(companyResponse.data.incomes),
                        avgIncomes: computeIncomes(companyResponse.data.incomes) / (companyResponse.data.incomes.length),
                        lastMonthIncomes: computeLastMonthIncomes(companyResponse.data.incomes)
                    }
                    mappedItems.push(result)
                })
            ))
            setFilteredCompanies(mappedItems)
            setCompaniesDetails(mappedItems)
        }).catch((error) => console.log(error))
        setLoading(true)
    }

    // data calculations
    const computeLastMonthIncomes = incomes => {
        // actually date
        const today = new Date();
        let lastMonth = today.getMonth() - 1;
        let actuallyYear = today.getYear();

        // change january -> december and year before
        if (lastMonth === -1) {
            actuallyYear--;
            lastMonth = 11;
        }

        let lastMonthIncomes = 0;

        const filteredCompanyIncomes = incomes.filter(income => {
            const incomeDate = new Date(income.date);
            return incomeDate.getMonth() === lastMonth && incomeDate.getYear() === actuallyYear;
        });

        filteredCompanyIncomes.map(income => {
            lastMonthIncomes += parseInt(income.value)
            return lastMonthIncomes;
        })

        return lastMonthIncomes;
    }

    const computeIncomes = incomes => {
        let sum = 0;
        incomes.map(item => (
            sum += parseInt(item.value)
        ))
        return sum;
    }

    useEffect(() => {
        getCompanies();
    }, [])

    // search input
    useEffect(() => {
        setFilteredCompanies(
            companiesDetails.filter(company => {
                return (
                    company.id.toString(10).includes(search) ||
                    company.name.toLowerCase().includes(search.toLowerCase()) ||
                    company.city.toLowerCase().includes(search.toLowerCase()) ||
                    company.incomes.toString(10).includes(search) ||
                    company.avgIncomes.toString(10).includes(search) ||
                    company.lastMonthIncomes.toString(10).includes(search)
                )
            })
        )
    }, [search, companiesDetails])

    const sort = (type, key) => {
        let sorted = [];
        if (type === 'string') {
            if (sortDesc) {
                sorted = filteredCompanies.sort((a, b) => {
                    if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
                    if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
                    return 0;
                });
            } else {
                sorted = filteredCompanies.sort((a, b) => {
                    if (b[key].toLowerCase() < a[key].toLowerCase()) return -1;
                    if (b[key].toLowerCase() > a[key].toLowerCase()) return 1;
                    return 0;
                });
            };
        } else if (type === 'number') {
            if (sortDesc) {
                sorted = filteredCompanies.sort((a, b) => {
                    return b[key] - a[key];
                });
            } else {
                sorted = filteredCompanies.sort((a, b) => {
                    return a[key] - b[key];
                });
            }
        }
        setSortDesc(!sortDesc)
        setFilteredCompanies(sorted)
    }

    // Get current companies
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <main>
            <input
                className='search-company'
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Type to search..."
            />
            {loading ? (<CompaniesTable
                companies={currentCompanies}
                sort={sort}
            />) : <h2>Loading...</h2>}
            <Pagination
                companiesPerPage={companiesPerPage}
                totalCompanies={filteredCompanies.length}
                paginate={paginate}
            />
        </main>
    );
}

export default Main;