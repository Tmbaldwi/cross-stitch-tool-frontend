import React, { useState } from 'react';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface PixelSizeSelectionBoxProps{
}

const PaletteBox: React.FC<PixelSizeSelectionBoxProps> = () => {
    const dispatch = useDispatch();

    // global state vars
    const { colorOptions: colorOptionsDict } = useSelector((state: RootState) => state.color);
    const { colorSelection: colorSelectionDict } = useSelector((state: RootState) => state.color);

    // local state vars
    const [isChecked, setIsChecked] = useState(true);

    return(
        <div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties} = {

}

export default PaletteBox;