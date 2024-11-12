import React, { useState, useEffect, CSSProperties, MouseEvent } from 'react';
import CommonButton from './Buttons/CommonButton';

interface PixelSizeBoxProps{
    sizeSuggestions: string[][] | undefined,
    isPageLoading: boolean,
    handleResizeRequest: (pixelSize: number) => void;
}

const PixelSizeBox: React.FC<PixelSizeBoxProps> = ({ sizeSuggestions, isPageLoading, handleResizeRequest }) => {
    // local state vars
    const [currentPixelSize, setCurrentPixelSize] = useState("?");
    const [proposedPixelSize, setProposedPixelSize] = useState("");
    const [isInputInvalid, setIsInputInvalid] = useState(true);

    useEffect(() => {
        const isPopulated = sizeSuggestions !== undefined && sizeSuggestions.length > 0 && sizeSuggestions[0].length > 0;

        if(isPopulated){
            setCurrentPixelSize(String(sizeSuggestions[0][0]));
        }
        else{
            setCurrentPixelSize("?");
        }
    }, [sizeSuggestions])


    const handleSizeSuggestionClick = (e: MouseEvent, newProposedSize: string): void => {
        setProposedPixelSize(newProposedSize);
    }
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsedInput = parseInt(e.target.value, 10);

        if( !isNaN(parsedInput) && Number.isInteger(parsedInput) && parsedInput > 0){
            setIsInputInvalid(false);
        }
        else{
            setIsInputInvalid(true);
        }

        setProposedPixelSize(e.target.value);
    };

    const handleResizeClick = () => {
        setCurrentPixelSize(proposedPixelSize)

        const newPixelSize = parseInt(proposedPixelSize, 10);
        
        handleResizeRequest(newPixelSize);
    }

    const isResizeDisabled = () => {
        return isInputInvalid || isPageLoading;
    }

    return(
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <div style={styles.titleContainer}>
                    Suggested Sizes:
                </div>
                <div style={styles.contentContainer}>
                    <div style={styles.pixelSizeOptionHeaderContainer}>
                        <div style={styles.pixelSizeOptionHeaderOccurrences}>
                            Occurrences
                        </div>
                        <div style={styles.pixelSizeOptionHeaderSize}>
                            Size
                        </div>
                    </div>
                    {sizeSuggestions?.map((sizePair, index) => (
                        <div key={index} style={getPixelOptionRowStyling(index)}>
                            <div style={styles.pixelSizeOptionFrequencyDisplay}>
                                {sizePair[1]}
                            </div>
                            <div style={styles.pixelSizeOpitonSizeSuggestionDisplay}
                                onClick={(event: MouseEvent) => handleSizeSuggestionClick(event, sizePair[0])}
                            >
                                {sizePair[0] + " x " + sizePair[0]}
                            </div>
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
                            type='number'
                        />
                    </div>
                </div>
            </div>
            <CommonButton 
                onClick={handleResizeClick}
                disabled={isResizeDisabled()}
            >
                Resize
            </CommonButton>
        </div>
    );
};

const getPixelOptionRowStyling = (index: number): CSSProperties => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    ...(index !== 0 && { borderTop: '3px dotted black' }),
});


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
    pixelSizeOptionHeaderContainer: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        textAlign: 'center',
    },
    pixelSizeOptionHeaderOccurrences: {
        flex: 1,
        padding: 5,
        borderRight: '2px solid black',
    },
    pixelSizeOptionHeaderSize: {
        flex: 1,
        padding: 5,
    },
    pixelSizeOptionFrequencyDisplay: {
        flex: 1,
        padding: 5,
        borderRight: '2px solid black',
    },
    pixelSizeOpitonSizeSuggestionDisplay: {
        flex: 1,
        padding: 5,
        fontWeight: 'bold',
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
}

export default PixelSizeBox;