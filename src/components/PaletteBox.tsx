import React, { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setColorSelection, setColorActive, setAllColorsInactive } from '../redux/slices/colorSlice';
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
    const [isDefaultSelected, setIsDefaultSelected] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(-2);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIsChecked(event.target.checked);
    }

    const handleColorSelection = (e: MouseEvent, newColor: string, index: number): void => {
        if(!isSwapLoading && selectedIndex !== index){
            // deselect others
            dispatch(setAllColorsInactive(paletteColor));

            if(index === -1) {
                setIsDefaultSelected(true);
            }
            else {
                setIsDefaultSelected(false);
                // select this one
                dispatch(setColorActive({paletteColor: paletteColor, selectionIndex: index}));
            }

            swapColors(paletteColor, newColor)

            dispatch(setColorSelection({paletteColor, newSelection: newColor}));
            setSelectedIndex(index);
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
                <div style={getColorPalette(paletteColor, isDefaultSelected)}
                    onClick={(event: MouseEvent) => handleColorSelection(event, paletteColor, -1)}
                />
                <div style={getColorPalette(colorSelection)}/>
            </div>
            <div style={styles.bottomSectionContainer}>

            {colorOptions?.map((color, index) => (
                <div key={index} 
                    style={getColorOptionContainer(color.active)} 
                    onClick={(event: MouseEvent) => handleColorSelection(event, color.hexValue, index)}
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

const getColorPalette = (boxColor: string, active?: boolean) => {
    return {
        flex: 1,
        minWidth: 45,
        backgroundColor: boxColor,
        border: active ? '2px solid red' : '1px solid black',
    };
};

const getColorOptionContainer = (active: boolean) => {
    return {
        border: active ? '2px solid red' : 'none', 
        display: 'flex',
        alignItems: 'center',
        paddingRight: 10,
    };
}

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
    colorNameContainer: {
        maxWidth: 135
    },
}

export default PaletteBox;