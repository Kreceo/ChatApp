import React from 'react'
import { Link } from 'react-router-dom';

export const PrimaryButton = ({title, type}) => {
    return (
        <button className="btn btn-primary rounded-btn p-3 w-100" type={type}>{title}</button>
    )
}

export default PrimaryButton;