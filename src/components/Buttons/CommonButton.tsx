import React, { useState, useEffect, CSSProperties, MouseEvent, ReactNode } from 'react';

interface ButtonProps{
    children?: ReactNode,
    style?: React.CSSProperties,
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean,
}

const CommonButton: React.FC<ButtonProps> = ({children, style, onClick, disabled}) => {
    const appliedStyle = disabled ? { ...styles.disabledState, ...style } : { ...styles.enabledState, ...style };

    return(
        <button 
            style={appliedStyle}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};



const styles: { [key: string]: React.CSSProperties} = {
    enabledState: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    disabledState: {
        padding: '10px 20px',
        backgroundColor: 'lightGrey',
        color: 'grey',
        border: 'none',
        borderRadius: '4px',
    }
}

export default CommonButton;