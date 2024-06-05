import React from 'react';
import { noDataText } from '../container/messages';

const WizardTable = ({ columns, rows, inputHandleChange, inputValue }) => {
    const renderRows = (key, row) => {
        let tdValue = "-"
        if (typeof row[key] === "string") tdValue = row[key]
        else if (row[key]?.length > 0) {
            tdValue = row[key].map((item) => key === "inventors" ? item.firstName + " " + item.lastName : item.name)?.join(", ")
        }
        return <td key={key}>{tdValue}</td>
    }

    return (
        <table border={1}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {columns.map((column) => (
                        <td key={column.key}>{column.filter && <input type='text' value={inputValue[column.title]} onChange={(e) => inputHandleChange(e.target.value, column.title)} placeholder={`Search ${column.title}`} />}</td>
                    ))}
                </tr>
                {rows?.length > 0 ? rows.map((row) => (
                    <tr key={row.id}>
                        {columns.map((column) => renderRows(column.key, row))}
                    </tr>
                )) : <tr><td colSpan={6}>{noDataText}</td></tr>}
            </tbody>
        </table>
    );
};

export default WizardTable;