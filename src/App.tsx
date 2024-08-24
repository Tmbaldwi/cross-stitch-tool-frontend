import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [data, setData] = useState<{ id: number, testname: string, addr: string } | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/test/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Test Table Data</h1>
      {data ? (
        <div>
          <p>ID: {data.id}</p>
          <p>Test Name: {data.testname}</p>
          <p>Address: {data.addr}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
