import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItems from '../components/ListItems';
import { FaBeer } from 'react-icons/fa';

const Main = () => {

    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    // get companies
    const getCompanies = async () => {
        try {
            const data = await axios.get('https://recruitment.hal.skygate.io/companies');
            const result = data.data;
            setCompanies(result)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCompanies();
    }, [])

    useEffect(() => {
        setFilteredCompanies(

            companies.filter(company => {
                return company.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, companies])

    return (
        <main>
            <input
                className='search-company'
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Type to search..."
            />
            <ListItems companies={filteredCompanies} />
        </main>
    );
}

export default Main;