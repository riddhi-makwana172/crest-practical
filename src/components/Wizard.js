import React, { useEffect, useState } from 'react';
import WizardTable from './WizardTable';
import { callAPIInterface, createQueryString, wizardColumns } from '../container/constants';
import { applyFilter, resetFilter } from '../container/messages';

const Wizard = () => {
    const [loader, setLoader] = useState(false)
    const [wizardRows, setWizardRows] = useState([])
    const [inputValue, setInputValue] = useState({})

    const searchParams = new URLSearchParams(window.location.search);

    const getWizardData = async (filterValue = null) => {
        setLoader(true)
        let qs = ""
        if (filterValue) qs += `?${createQueryString(filterValue)}`
        try {
            const result = await callAPIInterface(`/Elixirs${qs}`)
            setWizardRows(result); setLoader(false)
        } catch (_e) {
            setLoader(false)
        }
    }

    useEffect(() => {
        const filterValue = JSON.parse(searchParams.get('filter'));
        filterValue && setInputValue(filterValue);

        // Call API to fetch wizard data
        getWizardData()
    }, [])

    const handleChange = (val, title) => setInputValue({ ...inputValue, [title]: val })

    const handleApplyFilterBtn = () => {
        searchParams.set('filter', JSON.stringify(inputValue));
        const newUrl = window.location.origin + window.location.pathname + "?" + searchParams.toString();
        window.history.pushState({}, "", newUrl);
        const filterValue = JSON.parse(searchParams.get('filter'))// Get the 'filter' param
        getWizardData(filterValue)
    }

    const handleResetFilters = () => {
        window.history.pushState({}, "", "/")
        setInputValue({})
        getWizardData(null)
    }

    return loader ? <h2>Loading Data...</h2> : (
        <>
            <div className='button-div'>
                <button className='apply-button' onClick={handleApplyFilterBtn}>{applyFilter}</button>
                <button onClick={handleResetFilters}>{resetFilter}</button>
            </div>
            <WizardTable columns={wizardColumns} rows={wizardRows} inputHandleChange={handleChange} inputValue={inputValue} /></>
    );
};

export default Wizard;