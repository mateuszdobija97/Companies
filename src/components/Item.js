import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Company = ({ company, i }) => {

    const [incomes, setIncomes] = useState([])

    // get incomes
    useEffect(() => {
        axios.get(`https://recruitment.hal.skygate.io/incomes/${company.id}`)
            .then(res => {
                setIncomes(res.data.incomes)
            })
            .catch(err => console.log(err))
    }, [company.id])

    // sum of company incomes
    let sumIncomes = 0;
    incomes.map(income => {
        sumIncomes += parseInt(income.value)
        return sumIncomes;
    })

    // sum of last month incomes
    const today = new Date();
    let lastMonth = today.getMonth() - 1;
    let actuallyYear = today.getYear();

    // if January -> December
    if (lastMonth === -1) {
        actuallyYear--;
        lastMonth = 11;
    }

    let lastMonthIncomes = 0;
    // first filter data from a specific month, later sums values
    (incomes.filter(income => {
        const date = new Date(income.date);
        return date.getMonth() === lastMonth && date.getYear() === actuallyYear;
    }).map(income => {
        lastMonthIncomes += parseInt(income.value)
        return lastMonthIncomes;
    }))


    // average of company incomes
    const avgIncomes = (sumIncomes / incomes.length).toFixed(2);

    return (
        <tr>
            <td data-label="#">{i}</td>
            <td data-label="Id:">{company.id}</td>
            <td data-label="Name:">{company.name}</td>
            <td data-label="City:">{company.city}</td>
            <td data-label="Total income:">{sumIncomes}</td>
            <td data-label="Average income:">{avgIncomes}</td>
            <td data-label="Last month income:">{lastMonthIncomes}</td>
        </tr>
    );
}

export default Company;