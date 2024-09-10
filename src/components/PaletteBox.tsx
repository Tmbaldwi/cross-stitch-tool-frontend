import React, { useState } from 'react';

interface PaletteBoxProps{
    paletteColor: string;
}

const PaletteBox: React.FC<PaletteBoxProps> = ({ paletteColor }) => {
    const [colorOptions, setColorOptions] = useState<string[] | undefined>(["#cf0020", "#ffa878", "#542f0f", "#3f48cc", "#fff200"]);
    const [colorSelection, setColorSelection] = useState<string>("#00ff44");
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
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
                <div style={getColorPalette(paletteColor)}/>
                <div style={getColorPalette(colorSelection)}/>
            </div>
            <div style={styles.bottomSectionContainer}>

            {colorOptions?.map((color, index) => (
                <div key={index} style={styles.colorOptionContainer}>
                    <div style={getColorOption(color)}/>
                    <div style={styles.colorNameContainer}>
                        {color}
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

const getColorPalette = (boxColor: string ) => {
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
        border: '1px solid black'
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