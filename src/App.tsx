// frontend/src/App.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/hello/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the message!", error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default App;
