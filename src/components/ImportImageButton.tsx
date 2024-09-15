import React, {useRef } from 'react';

interface ImportImageButtonProps {
    onImageSelect: (file: File) => void;
}

const ImportImageButton: React.FC<ImportImageButtonProps> = ({ onImageSelect }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div style={styles.importButton}>
            <button onClick={handleClick} style={styles.button}>
                Upload Image
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={styles.input}
                accept="image/*"
                onChange={handleFileChange}
            />
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

export default ImportImageButton;