import React, { useState } from 'react';
import ImportImageButton from './components/ImportImageButton';
import { uploadImage, getColorPalette } from './services/imageApiService';

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

  const getPaletteColor = (boxColor : string) => {
    return { backgroundColor: boxColor,
              height: 25,
              width: 25,
              margin: 10,
              border: '1px solid black'
            };
  };

  return (
    <div style={styles.screen}>
      {imageSrc && 
      <div style={styles.imageContainer}>
        <img src={imageSrc} alt="Selected" style={styles.image}/>
      </div>
      }

      <div style={styles.paletteContainer}>
        {colorPalette?.map((item, index) => (
          <div key={index}style={getPaletteColor(item)}/>
        ))}
      </div>

      <div style={styles.importImageButtonContainer}>
        <ImportImageButton onImageSelect={handleImageSelect} />
      </div>
      {imageSrc &&
      <button onClick={handleGetPaletteRequest}>
          Get Color Palette
      </button>
      }

    </div>
  );  
}

const styles: { [key: string]: React.CSSProperties } = {
  screen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  importImageButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  paletteContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteColor: {
    height: 25,
    width: 25,
    padding: 10,
  }
};

export default App;
