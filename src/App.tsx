import React, { useState } from 'react';
import ImportImageButton from './components/ImportImageButton';
import { uploadImage, getColorPalette, swapColorsService } from './services/imageApiService';
import PaletteBox from './components/PaletteBox';

const App: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [colorPalette, setColorPalette] = useState<string[] | undefined>(undefined);
  const [colorPaletteLoading, setColorPaletteLoading] = useState<boolean>(false);
  const [colorSwapLoading, setColorSwapLoading] = useState<boolean>(false);

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageSrc(fileReader.result as string);
  };

  const handleImageSelect = (file: File) => {
    uploadImage(file)
      .then(response => {
        console.log(response);

        // set image to screen
        fileReader.readAsDataURL(file);

        // process palette
        handleGetPaletteRequest();
      })
      .catch(error => {
        console.error('There was an error uploading the image', error);
      });
  }

  const swapColors = (originalColor: string, newColor : string) : void => {
    setColorSwapLoading(true);

     swapColorsService(originalColor, newColor)
      .then(updatedImage => {
        // set image to screen
        fileReader.readAsDataURL(updatedImage);
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
        setColorPalette(response);

        setColorPaletteLoading(false);
      })
      .catch(error => {
        console.error('There was an error getting the color palette', error);
        setColorPaletteLoading(false);
      });
  }

  const clearColorPalette = () => {
    setColorPalette(undefined);
  }

  return (
    <div style={styles.fullScreen}>

      { !colorPaletteLoading &&
        <div style={styles.paletteScreen}>
          <div style={styles.paletteScreenTitleContainer}>
            Color Palette
          </div>

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
      }

      { colorPaletteLoading &&
      <div style={styles.paletteLoadingScreen}>
          <div>Loading...</div>
      </div>
      }

      <div style={styles.imageScreen}>
        {imageSrc && 
        <div style={styles.imageContainer}>
          <img src={imageSrc} alt="Selected" style={styles.image}/>
        </div>
        }

        <div style={styles.importImageButtonContainer}>
          <ImportImageButton onImageSelect={handleImageSelect} />
        </div>

      </div>
    </div>
  );  
}

const styles: { [key: string]: React.CSSProperties } = {
  fullScreen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
  },
  paletteScreen:{
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    border: '2px solid black',
    height: '100vh',
    width: '100vw',
  },
  paletteScreenTitleContainer: {
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    borderBottom: '2px solid black',
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
  paletteBoxContainer: {
    padding: 10
  },
  imageScreen: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
  },
  importImageButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid black',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
};

export default App;
