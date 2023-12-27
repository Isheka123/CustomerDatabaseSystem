import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
 

const apiurl = process.env.REACT_APP_API_URL; 

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(apiurl)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Prepare CSV data from the users array
  const csvData = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.status,
  }));

  return (
    <div style={{ marginTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Customer Database Management System</h1>
      <div style={{ marginTop: '30px' }}>
        {/* CSVLink component for downloading CSV */}
        <CSVLink data={csvData} filename={'usermaster.csv'}>
          <button>Export to CSV</button>
        </CSVLink>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Id</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Gender</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((d, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>{d.id}</td>
                <td style={{ textAlign: 'center' }}>{d.name}</td>
                <td style={{ textAlign: 'center' }}>{d.email}</td>
                <td style={{ textAlign: 'center' }}>{d.gender}</td>
                <td style={{ textAlign: 'center' }}>{d.status}</td>
                <td style={{ textAlign: 'center' }}>
                  <Link to={`/edit/${d.id}`} className="btn btn-primary">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
