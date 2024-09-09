import React, { useState } from 'react';
import ImportImageButton from './components/ImportImageButton';
import { uploadImage, getColorPalette } from './services/imageApiService';
import PaletteBox from './components/PaletteBox';

const App: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [colorPalette, setColorPalette] = useState<string[] | undefined>(undefined);

  const handleImageSelect = (file: File) => {
    
    uploadImage(file)
      .then(response => {
        console.log(response)

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setImageSrc(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);

        handleGetPaletteRequest()
      })
      .catch(error => {
        console.error('There was an error uploading the image!', error);
      });
  }

  const handleGetPaletteRequest = () => {
    getColorPalette()
      .then(response => {
        console.log(response)

        setColorPalette(response);
      })
      .catch(error => {
        console.error('There was an error getting the color palette', error);
      });
  }

  return (
    <div style={styles.fullScreen}>
      <div style={styles.paletteScreen}>

        {colorPalette?.map((color, index) => (
          <div key={index} style={styles.paletteBoxContainer}>
            <PaletteBox paletteColor={color}/>
          </div> 
        ))}
      </div>

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
    border: '1px solid black',
    height: '100vh',
    width: '100vw',
  },
  paletteBoxContainer: {
    padding: 10
  },
  imageScreen: {
    flex: 3,
    border: '1px solid black',
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
