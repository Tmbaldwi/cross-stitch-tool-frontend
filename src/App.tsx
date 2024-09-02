import React, { useState } from 'react';
import ImportImageButton from './components/ImportImageButton';
import { uploadImage } from './services/imageApiService';

const App: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

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

  return (
    <div style={styles.screen}>
      {!imageSrc &&
      <div style={styles.importImageContainer}>
        <h1>Select an Image :)</h1>
        <ImportImageButton onImageSelect={handleImageSelect} />
      </div>
      }

      {imageSrc && 
      <div>
        <img src={imageSrc} alt="Selected" style={styles.image}/>
      </div>
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
  importImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow effect
  },
};

export default App;
