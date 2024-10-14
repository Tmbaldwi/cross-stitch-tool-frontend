import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setImageSrc } from './redux/slices/imageSlice';
import { setColorPalette, setColorOptions, resetAllColorSelections } from './redux/slices/colorSlice';
import ImportImageButton from './components/ImportImageButton';
import { uploadImage, getColorPalette, swapColorsService, resetImage } from './services/imageApiService';
import PaletteBox from './components/PaletteBox';
import ResetImageButton from './components/ResetImageButton';
import { Palette } from './models/PaletteModels';
import { parsePaletteDetails } from './models/PaletteModels';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // global state vars
  const { imageSrc } = useSelector((state: RootState) => state.image);
  const { colorPalette } = useSelector((state: RootState) => state.color);

  // local vars
  const [colorPaletteLoading, setColorPaletteLoading] = useState<boolean>(false);
  const [colorSwapLoading, setColorSwapLoading] = useState<boolean>(false);

  const handleImageSelect = (file: File) => {


    uploadImage(file)
      .then(image => {
        console.log("Image Recieved");

        // set image to screen
        dispatch(setImageSrc(image));

        // process palette
        handleGetPaletteRequest();
      })
      .catch(error => {
        console.error('There was an error uploading the image', error);
      });
  }

  const handleImageDisplaySetting = (file: File) => {

  }

  const swapColors = (originalColor: string, newColor : string) : void => {
    setColorSwapLoading(true);

     swapColorsService(originalColor, newColor)
      .then(updatedImage => {
        // set image to screen
        dispatch(setImageSrc(updatedImage));

        setColorSwapLoading(false);
      })
      .catch(error => {
        console.error('There was an error swapping the colors', error);
        setColorSwapLoading(false);
      });
    }

  const handleGetPaletteRequest = () => {
    setColorPaletteLoading(true);

    // clear palette first
    clearColorPalette();

    // get & set palette
    getColorPalette()
      .then(response => {
        console.log(response)
        dispatch(setColorPalette(response.color_palette));

        const details : Palette[] = parsePaletteDetails(response.color_palette_details);
        details.forEach((palette) => {
          dispatch(setColorOptions(palette))
        })

        setColorPaletteLoading(false);
      })
      .catch(error => {
        console.error('There was an error getting the color palette', error);
        setColorPaletteLoading(false);
      });
  }

  const clearColorPalette = () => {
    dispatch(setColorPalette([]));
  }

  const handleResetClick = () => {
    resetImage()
    .then(updatedImage => {
      // reset color selections
      dispatch(resetAllColorSelections());

      // set image to screen
      dispatch(setImageSrc(updatedImage));
    })
    .catch(error => {
      console.error('There was an error resetting the image', error);
    });
  }

  return (
    <div style={styles.fullScreen}>
      <div style={styles.splitScreen}>
        <PanelGroup autoSaveId="FullScreen" direction="horizontal">
          <Panel defaultSize={30} minSize={20}>
              { !colorPaletteLoading &&
              <div style={styles.paletteScreen}>
                <div style={styles.paletteScreenTitleContainer}>
                  Color Palette
                </div>

                <div style={styles.paletteScreenContentContainer}>
                  {colorPalette?.map((color, index) => (
                    <div key={index} style={styles.paletteBoxContainer}>
                      <PaletteBox 
                        paletteColor={color} 
                        swapColors={swapColors}
                        isSwapLoading={colorSwapLoading}
                      />
                    </div> 
                  ))}
                </div>
              </div>
            }

            { colorPaletteLoading &&
            <div style={styles.paletteLoadingScreen}>
                <div>Loading...</div>
            </div>
            }
          </Panel>
          
          <PanelResizeHandle />

          <Panel minSize={30}>
            <div style={styles.imageScreen}>
              <div style={styles.imageScreenTitleContainer}>
                  Image
              </div>

              <div style={styles.imageScreenContainer}>
                {imageSrc && 
                <div style={styles.imageContainer}>
                  <img src={`data:image/jpeg;base64,${imageSrc}`} alt="Pixel Art" style={styles.image}/>
                </div>
                }

                <div style={styles.buttonContainer}>
                  <ImportImageButton onImageSelect={handleImageSelect} />
                  { imageSrc &&
                  <ResetImageButton onResetClick={handleResetClick} />
                  }
                </div>
              </div>

            </div>
          </Panel>
        </PanelGroup>
      </div>

      <div style={styles.pixelSizeScreen}>
        <div style={styles.pixelSizeScreenTitleContainer}>
          Pixel Sizing
        </div>
      </div>
    </div>
  );  
}

const styles: { [key: string]: React.CSSProperties } = {
  fullScreen: {
    display: 'flex',
    flexDirection: 'row',
  },
  splitScreen:{
    flex: 6,
  },
  paletteScreen:{
    flex: 2,
    borderRight: '2px solid black',
    height: '100vh',
  },
  paletteScreenTitleContainer: {
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    borderBottom: '2px solid black',
    whiteSpace: 'nowrap',
  },
  paletteLoadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid black',
    height: '100vh',
    width: '100vw',
  },
  paletteScreenContentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    height: '100vh',
    overflowY: 'auto',
  },
  paletteBoxContainer: {
    padding: 10
  },
  imageScreen: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  imageScreenTitleContainer:{
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    borderBottom: '2px solid black',
    whiteSpace: 'nowrap',
  },
  imageScreenContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid black',
    width: '80%',
    height: '80%',
    backgroundColor: 'lightgrey',
    margin: 100,
  },
  image: {
    flex: 1,
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    imageRendering: 'pixelated',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  pixelSizeScreen:{
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    borderLeft: '2px solid black',
    height: '100vh',
    width: '100vw',
  },
  pixelSizeScreenTitleContainer:{
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    borderBottom: '2px solid black',
    whiteSpace: 'nowrap',
  },
};

export default App;
