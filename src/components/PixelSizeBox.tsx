import React, { useState } from 'react';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface PixelSizeBoxProps{
    sizeSuggestions: string[][],
    isSwapLoading: boolean,
}

const PixelSizeBox: React.FC<PixelSizeBoxProps> = () => {
    const dispatch = useDispatch();

    // global state vars
    const { colorOptions: colorOptionsDict } = useSelector((state: RootState) => state.color);
    const { colorSelection: colorSelectionDict } = useSelector((state: RootState) => state.color);

    // local state vars
    const [isChecked, setIsChecked] = useState(true);
    const [currentPixelSize, setCurrentPixelSize] = useState("10")
    const [proposedPixelSize, setProposedPixelSize] = useState("")
    
    const[testPixelOptions, setTestPixelOptions] = useState([[16,830], [32, 164], [48, 98], [64, 41], [80,20]])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProposedPixelSize(e.target.value);
    };

    const handleResizeClick = () => {
        setCurrentPixelSize(proposedPixelSize)
        // TODO perform resize
    }

    return(
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <div style={styles.titleContainer}>
                    Suggested Sizes:
                </div>
                <div style={styles.contentContainer}>
                    <div style={styles.pixelSizeOptionHeader}>
                        Occurences | Size
                    </div>
                    {testPixelOptions?.map((sizePair, index) => (
                        <div key={index} style={styles.pixelSizeOption}>
                            {sizePair[1] + " | " + sizePair[0] + " x " + sizePair[0]}
                        </div> 
                    ))}
                </div>
                <div style={styles.currentPixelSizeContainer}>
                    <div style={styles.currentPixelSizeTitle}>
                        Current Pixel Size: 
                    </div>
                    <div style={styles.currentPixelSizeDisplay}>
                        {currentPixelSize} x {currentPixelSize}
                    </div>
                </div>
                <div style={styles.pixelSizeInputContainer}>
                    <div style={styles.pixelSizeInputText}>
                        Set Pixel Size:
                    </div>
                    <div style={styles.pixelSizeInputBox}>
                        <input 
                            style={styles.pixelSizeInput}
                            placeholder={currentPixelSize}
                            value={proposedPixelSize}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <button 
                style={styles.button}
                onClick={handleResizeClick}
            >
                Resize
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties} = {
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 300,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid black',
        margin: 20,
        backgroundColor: 'lightgrey',
        width: '100%',
    },
    titleContainer:{
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        borderBottom: '3px dashed black',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
    },
    contentContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 10,
    },
    pixelSizeOptionHeader: {
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    pixelSizeOption:{
        padding: 5
    },
    currentPixelSizeContainer:{
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'row',
        width: '100%',
        borderTop: '2px solid black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentPixelSizeTitle: {
        flex: 3,
        whiteSpace: 'nowrap',
        borderRight: '2px solid black',
        fontWeight: 'bold',
        padding: 10,
        boxSizing: 'border-box',
    },
    currentPixelSizeDisplay: {
        flex: 2,
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        padding: 10,
        boxSizing: 'border-box',
    },
    pixelSizeInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        textAlign: 'center',
        borderTop: '2px solid black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pixelSizeInputText: {
        flex: 3,
        padding: 10,
        whiteSpace: 'nowrap',
        borderRight: '2px solid black',
        fontWeight: 'bold',
    },
    pixelSizeInputBox: {
        flex: 2,
        display: 'flex',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        justifyContent: 'center',
        padding: 10,
        boxSizing: 'border-box',
    },
    pixelSizeInput: {
        width: 60,
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    button: {
        
    }
}

export default PixelSizeBox;