import React from 'react'

export const PrimaryButton = ({title, type}) => {
    return (
        <button className="primaryButton" type={type}>{title}</button>
    )
}

export default PrimaryButton;