import React from 'react';

interface ResetImageButtonProps {
    onResetClick(): void
}

const ResetImageButton: React.FC<ResetImageButtonProps> = ({ onResetClick }) => {
    return (
        <div style={styles.importButton}>
            <button onClick={onResetClick} style={styles.button}>
                Reset
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    importButton: {
        margin: 10,
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    input: {
      display: 'none',
    },
  };

export default ResetImageButton;