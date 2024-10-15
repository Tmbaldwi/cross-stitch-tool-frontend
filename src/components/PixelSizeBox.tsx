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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProposedPixelSize(e.target.value); // Update the state with the new input
    };

    return(
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <div style={styles.titleContainer}>
                    Suggested Sizes
                </div>
                <div style={styles.contentContainer}>
                    content
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
                    <div style={styles.pixelSizeInputTextContainer}>
                        Set Pixel Size:
                    </div>
                    <div style={styles.pixelSizeInputBox}>
                        <input 
                            style={styles.pixelSizeInput}
                            placeholder={currentPixelSize}
                            value={proposedPixelSize}
                            onChange={handleInputChange}
                        /> x {proposedPixelSize}
                    </div>
                </div>
            </div>
            <button style={styles.button}>
                Resize
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties} = {
    outerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid black',
        margin: 20,
        backgroundColor: 'lightgrey',
    },
    titleContainer:{
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        borderBottom: '2px solid black',
        whiteSpace: 'nowrap',
    },
    contentContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        padding: 10,
    },
    currentPixelSizeContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        borderTop: '2px solid black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentPixelSizeTitle: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'nowrap',
    },
    currentPixelSizeDisplay: {
        flex: 1,
        textAlign: 'center',
        paddingRight: 10,
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
    },
    pixelSizeInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        borderTop: '2px solid black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pixelSizeInputTextContainer: {
        flex: 1,
        textAlign: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'nowrap',
    },
    pixelSizeInputBox: {
        flex: 1,
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
    },
    pixelSizeInput: {
        marginLeft: 10,
        minWidth: 25,
        width: '50%',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    button: {
        
    }
}

export default PixelSizeBox;