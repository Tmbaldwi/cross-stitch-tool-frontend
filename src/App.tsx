import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [data, setData] = useState<Array<{ id: number, testname: string, addr: string }> | null>(null);

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
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <div>
                <p>ID: {item.id}</p>
                <p>Test Name: {item.testname}</p>
                <p>Address: {item.addr}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}

export default App;
