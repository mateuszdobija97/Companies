import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItems from '../components/ListItems';

const Main = () => {

    const [companies, setCompanies] = useState([]);

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

    return (
        <main>
            <ListItems companies={companies} />
        </main>
    );
}

export default Main;