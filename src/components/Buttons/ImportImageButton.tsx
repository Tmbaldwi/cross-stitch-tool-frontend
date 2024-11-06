import React, {useRef } from 'react';
import CommonButton from './CommonButton';

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
            <CommonButton onClick={handleClick}>
                Upload Image
            </CommonButton>
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
    input: {
      display: 'none',
    },
  };

export default ImportImageButton;