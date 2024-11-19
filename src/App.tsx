import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setImageSrc, clearImageSrc, setImageSizeSuggestions, clearImageSizeSuggestions } from './redux/slices/imageSlice';
import { setColorPalette, clearColorPalette, setColorOptions, resetAllColorSelections } from './redux/slices/colorSlice';
import ImportImageButton from './components/Buttons/ImportImageButton';
import { uploadImage, getColorPalette, swapColorsService, resetImage, resizeImage } from './services/imageApiService';
import PaletteBox from './components/PaletteBox';
import { Palette } from './models/PaletteModels';
import { parsePaletteDetails } from './models/PaletteModels';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PixelSizeBox from './components/PixelSizeBox';
import CommonButton from './components/Buttons/CommonButton';
import LoadingOverlay from './components/loadingOverlay';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // global state vars
  const { imageSrc } = useSelector((state: RootState) => state.image);
  const { imageSizeSuggestions } = useSelector((state: RootState) => state.image);
  const { colorPalette } = useSelector((state: RootState) => state.color);

  // local vars
  const [colorPaletteLoading, setColorPaletteLoading] = useState<boolean>(false);
  const [colorSwapLoading, setColorSwapLoading] = useState<boolean>(false);
  const [imageResizeLoading, setImageResizeLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageResetLoading, setImageResetLoading] = useState<boolean>(false);


  const handleResizeRequest = (pixelSize: number) => {
    setImageResizeLoading(true);

    resizeImage(pixelSize)
      .then(image => {
        // update image
        dispatch(setImageSrc(image));
        
        // process palette
        handleGetPaletteRequest();

        setImageResizeLoading(false);
      })
      .catch(error => {
        console.error('There was an error resizing the image', error);
        setImageResizeLoading(false);
      });
  }

  const clearPage = () => {
    dispatch(clearColorPalette());
    dispatch(clearImageSrc());
    dispatch(clearImageSizeSuggestions())
  }

  const handleImageSelect = (file: File) => {
    clearPage();

    setImageLoading(true);
    
    uploadImage(file)
      .then(imageDetails => {
        console.log("Image Recieved");

        // set image to screen
        dispatch(setImageSrc(imageDetails.image));
        dispatch(setImageSizeSuggestions(imageDetails.pixel_size_options))

        // process palette
        handleGetPaletteRequest();

        setImageLoading(false);
      })
      .catch(error => {
        console.error('There was an error uploading the image', error);
        setImageLoading(false);
      });
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


  const handleResetClick = () => {
    setImageResetLoading(true);

    resetImage()
    .then(updatedImage => {

      // reset color selections
      dispatch(resetAllColorSelections());

      // set image to screen
      dispatch(setImageSrc(updatedImage));

      setImageResetLoading(false);
    })
    .catch(error => {
      console.error('There was an error resetting the image', error);
      setImageResetLoading(false);
    });
  }

  const isImageLoading = () => {
    return imageLoading || imageResetLoading || imageResizeLoading || colorSwapLoading;
  }

  const isColorPaletteLoading = () => {
    return colorPaletteLoading || colorSwapLoading || imageResizeLoading || imageLoading;
  }

  const isPageLoading = () => {
    return isImageLoading() || isColorPaletteLoading() || imageSrc === undefined ;
  }

  return (
    <div style={styles.fullScreen}>
      <div style={styles.splitScreen}>
        <PanelGroup autoSaveId="FullScreen" direction="horizontal">
          <Panel defaultSize={30} minSize={20}>
              <div style={styles.paletteScreen}>
                <div style={styles.paletteScreenTitleContainer}>
                  Color Palette
                </div>

                <LoadingOverlay loading={isColorPaletteLoading()}>
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
                </LoadingOverlay>
              </div>
          </Panel>
          
          <PanelResizeHandle />

          <Panel minSize={30}>
            <div style={styles.imageScreen}>
              <div style={styles.imageScreenTitleContainer}>
                  Image
              </div>

              <div style={styles.imageScreenContainer}>
                <div style={styles.imageContainer}>
                  <LoadingOverlay loading={isImageLoading()}>
                    { imageSrc &&
                      <img src={`data:image/jpeg;base64,${imageSrc}`} alt="Pixel Art" style={styles.image}/>
                    }
                  </LoadingOverlay>
                </div>

                <div style={styles.buttonContainer}>
                  <ImportImageButton onImageSelect={handleImageSelect} />
                  { imageSrc &&
                  <CommonButton onClick={handleResetClick}>
                    Reset
                  </CommonButton>
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
        <div style={styles.pixelSizeScreenContent}>
          <PixelSizeBox 
            sizeSuggestions={imageSizeSuggestions} 
            isPageLoading={isPageLoading()}
            handleResizeRequest={handleResizeRequest}
          />
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
    width: '100%',
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
  },
  image: {
    flex: 1,
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    imageRendering: 'pixelated',
    padding: 20,
    boxSizing: 'border-box',
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
    borderLeft: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  pixelSizeScreenContent: {
    display: 'flex',
    width: '100%',
    alignContent: 'flex-start',
    justifyContent: 'center',
  }
};

export default App;
