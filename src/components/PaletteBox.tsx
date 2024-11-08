import React, { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setColorSelection } from '../redux/slices/colorSlice';
import { ColorOption } from '../models/PaletteModels';

interface PaletteBoxProps{
    paletteColor: string;
    swapColors(originalColor: string, newColor: string) : void
    isSwapLoading: boolean;
}

const PaletteBox: React.FC<PaletteBoxProps> = ({ paletteColor, swapColors, isSwapLoading }) => {
    const dispatch = useDispatch();

    // global state vars
    const { colorOptions: colorOptionsDict } = useSelector((state: RootState) => state.color);
    const colorOptions: ColorOption[] = colorOptionsDict[paletteColor];
    const { colorSelection: colorSelectionDict } = useSelector((state: RootState) => state.color);
    const colorSelection: string = colorSelectionDict[paletteColor];

    // local state vars
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIsChecked(event.target.checked);
    }

    const handleColorSelection = (e: MouseEvent, newColor: string): void => {
        if(!isSwapLoading && colorSelection !== newColor){
            swapColors(paletteColor, newColor)

            dispatch(setColorSelection({paletteColor, newSelection: newColor}));
        }
    }

    return(
        <div>
            <div style={styles.topSectionContainer}>
                <div style={styles.checkBoxContainer}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        style={styles.checkBox}
                    />
                </div>
                <div style={getColorPalette(paletteColor)}
                    onClick={(event: MouseEvent) => handleColorSelection(event, paletteColor)}
                />
                <div style={getColorPalette(colorSelection)}/>
            </div>
            <div style={styles.bottomSectionContainer}>

            {colorOptions?.map((color, index) => (
                <div key={index} 
                    style={styles.colorOptionContainer} 
                    onClick={(event: MouseEvent) => handleColorSelection(event, color.hexValue)}
                >
                    <div style={getColorOption(color.hexValue)}/>
                    <div style={styles.colorNameContainer}>
                        {color.name}
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

const getColorOption = (boxColor : string) => {
    return { backgroundColor: boxColor,
              height: 25,
              width: 25,
              margin: 10,
              border: '1px solid black',
            };
};

const getColorPalette = (boxColor: string) => {
    return {
        flex: 1,
        minWidth: 45,
        backgroundColor: boxColor,
        border: '1px solid black',
    };
};

const styles: { [key: string]: React.CSSProperties} = {
    topSectionContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    checkBoxContainer: {
        aspectRatio: 1,
        height: 45,
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBox: {
        height: '50%',
        width: '50%',
    },
    bottomSectionContainer: {
        border: '1px solid black',
        maxHeight: 275,
        overflowY: 'auto'
    },
    colorOptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    colorNameContainer: {
        maxWidth: 135
    },
}

export default PaletteBox;