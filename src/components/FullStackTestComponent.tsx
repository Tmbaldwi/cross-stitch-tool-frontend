import React, { useState, useEffect } from 'react';
import { getTest } from '../services/testApiService';

interface TestData {
  id: number;
  testname: string;
  addr: string;
}

const FullStackTestComponent: React.FC = () => {
  const [data, setData] = useState<TestData[] | null>(null);

  useEffect(() => {
    getTest()
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
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

export default FullStackTestComponent;
